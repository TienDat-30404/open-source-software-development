from django.db import migrations

def create_default_roles(apps, schema_editor):
    Role = apps.get_model('roles', 'Role')
    Role.objects.create(name='Admin')
    Role.objects.create(name='User')

def delete_default_roles(apps, schema_editor):
    Role = apps.get_model('roles', 'Role')
    Role.objects.filter(name__in=['Admin', 'User']).delete()
    

class Migration(migrations.Migration):
    dependencies = [
        ('roles', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_roles, delete_default_roles),
    ] 