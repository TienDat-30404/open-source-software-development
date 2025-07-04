# Generated by Django 5.1.6 on 2025-03-24 11:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0004_playlist_image_alter_playlist_description_and_more'),
        ('songs_playlist', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='songplaylist',
            name='playlist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playlist_song', to='playlists.playlist'),
        ),
    ]
