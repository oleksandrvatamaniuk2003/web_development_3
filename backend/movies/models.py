from django.db import models

class Movie(models.Model):
    title = models.CharField(max_length=255, verbose_name="Назва")
    description = models.TextField(verbose_name="Опис")
    release_year = models.PositiveIntegerField(verbose_name="Рік виходу")
    genre = models.CharField(max_length=100, verbose_name="Жанр")
    director = models.CharField(max_length=100, verbose_name="Режисер")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Фільм"
        verbose_name_plural = "Фільми"