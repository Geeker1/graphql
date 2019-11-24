from django.db import models

# Create your models here.


class Author(models.Model):
    name = models.CharField(max_length=29)
    age = models.IntegerField()


class Book(models.Model):
    name = models.CharField(max_length=20)
    genre = models.CharField(max_length=20)
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='books'
    )
