# Generated by Django 5.1.6 on 2025-04-05 14:59

from django.db import migrations, models




class Migration(migrations.Migration):

    dependencies = [
        ("plans", "0002_plan_duration_days"),
    ]

    operations = [
        migrations.AlterField(
            model_name="plan",
            name="price",
            field=models.IntegerField(),
        ),
    ]
