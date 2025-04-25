from django.db import migrations

def create_default_roles(apps, schema_editor):
    Role = apps.get_model('roles', 'Role')
    Role.objects.create(name='admin')
    Role.objects.create(name='user')

def delete_default_roles(apps, schema_editor):
    Role = apps.get_model('roles', 'Role')
    Role.objects.filter(name__in=['admin', 'user']).delete()

class Migration(migrations.Migration):
    dependencies = [
        ('roles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_roles, delete_default_roles),
    ] 