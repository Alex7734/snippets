# Generated by Django 3.1.7 on 2021-02-23 14:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImaginiAnexe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Imagini produs',
                'verbose_name_plural': 'Imagini produse',
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='ImaginiProduse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(null=True, upload_to='')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Imagini produs',
                'verbose_name_plural': 'Imagini produse',
                'ordering': ['-created'],
            },
        ),
    ]
