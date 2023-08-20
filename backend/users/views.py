from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
import datetime

# View to handle user registration
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        # Validate and save user data if valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        
        # Return error if validation fails
        return Response(serializer.errors, status=400)

# View to handle user login
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        # find the user with the given email
        user = User.objects.filter(email=email).first()

        # if user is not found, return response with status code 404
        if user == None:
            return Response({'message': 'User not found!'}, status=404)

        # if user if found and passwword is incorrect, return response with status code 401
        if not user.check_password(password):
            return Response({'message': 'Incorrect password!'}, status=401)

        # generate jwt token for authentication
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        # set the jwt token in the response cookie as httponly
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response

# View to retrieve user information based on JWT token
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        # return error if token is not found
        if not token:
            return Response({'message': 'Unauthenticated!'}, status=401)

        # decode the token and retrieve the user information
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response({'message': 'An Error Occured'}, status=400)

        #  Retrieve the user information based on the decoded token
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

# View to handle user logout
class LogoutView(APIView):
    def post(self, request):
        response = Response()

        # delete the jwt token from the response cookie
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        response.status_code = 200

        return response
