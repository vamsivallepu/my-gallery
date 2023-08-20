from django.db import models
from django.contrib.auth import get_user_model

# model to represent the image
class Image(models.Model):
    # get the user model defined in the project settings
    User = get_user_model()
    # foreign key relationship to the User model
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    upload_date = models.DateTimeField(auto_now_add=True)

    # to represent the image object as a string (title)
    def __str__(self):
        return self.title
