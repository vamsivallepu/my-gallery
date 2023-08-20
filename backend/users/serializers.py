from rest_framework import serializers
from .models import User

# serializer class for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields to include in the serialized representation
        fields = ['id', 'name', 'email', 'password']
        # making password write only (avoiding the password to be displayed in the response)
        extra_kwargs = {'password': {'write_only': True}}

    # Custom method to handle user creation
    def create(self, validated_data):
        # extract the password from the validated data
        password = validated_data.pop('password', None)
        # creating the user instance with the validated data
        instance = self.Meta.model(**validated_data)

        # if password is not None, set the password for the user instance
        if password != None:
            instance.set_password(password)

        # save the user instance to the database and return the instance
        instance.save()
        return instance
