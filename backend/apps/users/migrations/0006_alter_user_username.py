# Generated by Django 5.1.6 on 2025-05-06 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_type_login_alter_user_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
