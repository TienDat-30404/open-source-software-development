from jsonrpcserver import method, Result, Success, dispatch
from django.conf import settings
import django
import os
import sys
from django.db.models.functions import Cast
from django.db.models import CharField
import google.generativeai as genai
import redis
import time
import re

# Kết nối Redis
# redis_client = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

redis_client = redis.StrictRedis(
    host=os.getenv("REDIS_HOST"),
    port=int(os.getenv("REDIS_PORT")),
    db=0,
    decode_responses=True
)
# Thêm thư mục backend/ vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Khởi tạo Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from apps.songs.models import Song, Artist
from apps.plans.models import Plan

from apps.songs_artist.models import SongArtist

# Cấu hình Gemini
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


@method
def get_song_count():
    count = Song.objects.count()
    songs = (
        Song.objects.all()
        .annotate(id_str=Cast("id", CharField()))
        .values("id_str", "title", "image", "duration")
    )
    return Success({"total_songs": count, "songs": list(songs)})


@method
def get_songs_by_artist(artist_id: str):
    count = Song.objects.filter(artist__id=artist_id).count()
    songs = (
        Song.objects.filter(artist__id=artist_id)
        .annotate(id_str=Cast("id", CharField()))
        .values("id_str", "title", "image", "duration")
    )
    return Success({"total_songs": count, "songs": list(songs)})


@method
def search_songs_by_title(title: str):
    songs = (
        Song.objects.filter(title__icontains=title)
        .annotate(id_str=Cast("id", CharField()))
        .values("id_str", "title", "audio_url", "image", "duration")
    )
    return Success({"songs": list(songs)})


@method
def get_song_by_id(song_id: str):
    try:
        song = Song.objects.get(id=song_id)
        return Success(
            {
                "id": str(song.id),
                "title": song.title,
                "audio_url": song.audio_url,
                "image": song.image,
                "duration": song.duration,
            }
        )
    except Song.DoesNotExist:
        return Success({"error": "Song not found"})


@method
def suggest_songs_ai(user_id: str = None, query: str = None):
    print(query)
    if not query:
        return Success({"error": "Missing query parameter."})

    try:

        # Tìm kiếm dữ liệu liên quan trong cơ sở dữ liệu
        context = ""
        # Kiểm tra câu hỏi về số lượng nghệ sĩ
        if re.search(
            r"(bao nhiêu|số lượng) (nghệ sĩ|ca sĩ)|how many (artists|singers)", query.lower()
        ):
            artist_count = Artist.objects.count()
            context = f"Có {artist_count} nghệ sĩ trong hệ thống"
        elif re.search(
            r"bao nhiêu bài hát|how many artists|số lượng bài hát", query.lower()
        ):
            song_count = Song.objects.count()
            context = f"Có {song_count} bài hát trong hệ thống"
        elif re.search(
            r"bao nhiêu gói|how many premium|số lượng premium", query.lower()
        ):
            premium_plans = Plan.objects.all().values_list("name", flat=True)
            premium_count = premium_plans.count()
            premium_names = ", ".join(premium_plans)
            context = f"Có {premium_count} gói premium trong hệ thống: {premium_names}."

        
        # Kiểm tra câu hỏi về nghệ sĩ
        elif "nghệ sĩ" in query.lower() or "artist" in query.lower() or "ca sĩ" in query.lower():
            artist_name = query.split()[-1]
            artist = Artist.objects.filter(name__icontains=artist_name).first()
            if artist:
                # Lấy danh sách song_id từ bảng trung gian
                song_ids = SongArtist.objects.filter(artist=artist).values_list(
                    "song_id", flat=True
                )
                
                songs = (
                    Song.objects.filter(id__in=song_ids)
                    .values_list("title",  flat=True)  # Trả về danh sách tên bài hát đơn giản
                )
                context = f"Nghê sĩ {artist.name} - sinh vào {artist.date_of_birth}, sinh ra tại {artist.country} Những bài hát thuộc nghệ sĩ {artist.name}: {', '.join(songs)}"
            else:
                context = f"Hiện không tồn tại nghệ sĩ này trong hệ thống"
        # Kiểm tra câu hỏi về bài hát
        elif "bài hát" in query.lower() or "song" in query.lower():
        # Loại bỏ từ khóa "bài hát" hoặc "song" khỏi query và strip khoảng trắng
            cleaned_query = re.sub(r"(bài hát|song)", "", query, flags=re.IGNORECASE).strip()
            
            # So khớp chính xác không phân biệt hoa thường
            song = Song.objects.filter(title__iexact=cleaned_query).first()
            
            if song:
                context = (
                    f"Bài: {song.title} hiện đang được phát hành trên hệ thống và được ra mắt vào {song.release_date}"
                )
            else:
                context = f"Không tìm thấy bài hát có tiêu đề là '{cleaned_query}' trong hệ thống."
                
        elif "gói" in query.lower() or "premium" in query.lower() or "gói premium" in query.lower():
            cleaned_query = re.sub(r"(gói|premium|gói premium)", "", query, flags=re.IGNORECASE).strip()
            
            # So khớp chính xác không phân biệt hoa thường
            premium = Plan.objects.filter(name__iexact=cleaned_query).first()
            
            if premium:
                context = (
                    f"Gói {premium.name} với giá {premium.price}đ/{premium.duration_days} tháng bao gồm : {premium.description}"
                )
            else:
                context = f"Không tìm thấy gói premium có tiêu đề là '{cleaned_query}' trong hệ thống."
        # Lưu vào Redis với thời hạn 3000 giây
        
        timestamp = int(time.time())
        f = redis_client.setex(
            f"{user_id}*****{query}*****{timestamp}", 3000, context
        )
        print("f", f)
        return Success({"response": context})

        # Tạo prompt linh động
        prompt = f"You are a music assistant. Based on the following user query and context, provide a helpful and concise response. If the query asks for song recommendations, suggest up to 5 song titles. If it asks for information about an artist, song, or the number of artists, provide relevant details. If the query is unclear, ask for clarification. Query: '{query}'. Context: {context}"

        # Khởi tạo và gọi Gemini
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(prompt)
        ai_response = response.text.strip()

        # return Success({"response": ai_response})
    except Exception as e:
        return Success({"error": f"AI processing failed: {str(e)}"})


def main():
    from http.server import BaseHTTPRequestHandler, HTTPServer

    class MCPHandler(BaseHTTPRequestHandler):
        def _set_cors_headers(self):
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

        def do_OPTIONS(self):
            self.send_response(200)
            self._set_cors_headers()
            self.end_headers()

        def do_POST(self):
            content_length = int(self.headers["Content-Length"])
            request_body = self.rfile.read(content_length).decode("utf-8")
            response = dispatch(request_body)

            self.send_response(200)
            self._set_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(str(response).encode("utf-8"))


    server_address = ("", 8001)
    httpd = HTTPServer(server_address, MCPHandler)
    print("MCP Server running on port 8001...")
    httpd.serve_forever()


if __name__ == "__main__":
    main()
