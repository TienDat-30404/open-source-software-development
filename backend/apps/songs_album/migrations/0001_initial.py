# Generated by Django 5.1.6 on 2025-03-09 09:23

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('albums', '0002_rename_artist_id_album_artist'),
        ('songs', '0007_remove_song_album_remove_song_artist_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SongAlbum',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='albums.album')),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='songs.song')),
            ],
            options={
                'db_table': 'songs_album',
            },
        ),
    ]
