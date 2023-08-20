from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Custom User Manager to create a user with email as the primary identifier


class CustomUserManager(BaseUserManager):

    # function to create a user with email and password
    def create_user(self, email, password=None, **extra_fields):
        extra_fields = {"is_staff": False,
                        "is_superuser": False, **extra_fields}
        if not email:
            raise ValueError("Users must have an email address")

        user = User(email=email, **extra_fields)

        if password:
            user.set_password(password)
            user.save(using=self._db)

        else:
            user.set_unusable_password()
        return user

    # override the create_superuser method to set the is_staff and is_superuser fields to True
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields = {**extra_fields, "is_staff": True, "is_superuser": True}
        user = self.create_user(email=email, password=password, **extra_fields)
        user.save(using=self._db)

        return user

# Custom User Model with Email as the primary identifier instead of username
class User(AbstractUser):
    name = models.CharField(max_length=100, null=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    password = models.CharField(max_length=100, null=False)
    username = None

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
