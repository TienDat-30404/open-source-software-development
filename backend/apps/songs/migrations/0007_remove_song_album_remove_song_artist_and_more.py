# Generated by Django 5.1.6 on 2025-03-09 09:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0006_alter_song_album_alter_song_playlist'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='album',
        ),
        migrations.RemoveField(
            model_name='song',
            name='artist',
        ),
        migrations.RemoveField(
            model_name='song',
            name='playlist',
        ),
    ]
