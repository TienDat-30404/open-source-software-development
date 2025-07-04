# Generated by Django 5.1.6 on 2025-03-06 10:56

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('albums', '0001_initial'),
        ('artists', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('title', models.CharField(max_length=255)),
                ('duration', models.IntegerField()),
                ('genre', models.CharField(max_length=100)),
                ('release_date', models.DateField()),
                ('audio_url', models.CharField(max_length=500)),
                ('album_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='albums.album')),
                ('artist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='artists.artist')),
            ],
            options={
                'db_table': 'songs',
            },
        ),
    ]
