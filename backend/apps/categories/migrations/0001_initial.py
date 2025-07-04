# Generated by Django 5.1.6 on 2025-03-06 14:09

import uuid
from django.db import migrations, models

def create_default_categories(apps, schema_editor):
    Category = apps.get_model('categories', 'Category')
    Category.objects.create(name='Pop')
    Category.objects.create(name='Rock')
    Category.objects.create(name='Jazz')
    Category.objects.create(name='Nhạc buồn tâm trạng')
    Category.objects.create(name='Nhạc trẻ')

def delete_default_categories(apps, schema_editor):
    Category = apps.get_model('categories', 'Category')
    Category.objects.filter(name__in=['Pop', 'Rock', 'Jazz', 'Classical', 'Hip Hop']).delete()

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'categories',
            },
        ), 
        migrations.RunPython(create_default_categories, delete_default_categories),
    ]
