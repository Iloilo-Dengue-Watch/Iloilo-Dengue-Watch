from django.db import models

# Create your models here.
class News(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    source = models.CharField(max_length=200)
    img_url = models.URLField()
    chatgpt_summarization = models.TextField()

