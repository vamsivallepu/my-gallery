from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Image
from rest_framework.exceptions import AuthenticationFailed
from users.models import User
import jwt

# function to get user based on JWT token
def get_user(request):

    # get the JWT token from the request cookie
    token = request.COOKIES.get('jwt')
    if not token:
        return None

    # decode the JWT token 
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated!')

    # Retrieve the user from the User model based on the decoded token's ID
    user = User.objects.filter(id=payload['id']).first()
    return user

# View to handle listing all images of the user
class ImageListView(APIView):

    # handle GET request and returns all images of the user
    def get(self, request):
        user = get_user(request)

        # If user is not authenticated, return an error response
        if not user:
            return Response({'error': 'Unauthenticated!'})
        
        # Retrieve all images belonging to the authenticated user
        images = Image.objects.filter(user=user)

        # Prepare image data to be included in the response
        data = [{'id': image.id, 'title': image.title, 'description': image.description,
                 'upload_date': image.upload_date, 'image': image.image.url} for image in images]

        return Response(data)

# view to handle retrieving details of a single image
class ImageDetailView(APIView):

    # Handle GET request to retrieve image details
    def get(self, request, pk):
        user = get_user(request)
        if not user:
            return Response({'error': 'Unauthenticated!'})

        # Retrieve the image associated with the authenticated user and the specified pk
        image = Image.objects.filter(user=user, id=pk).first()

        # If image is not found, return an error response with status 404
        if not image:
            return Response({'error': 'Image not found!'}, status=404)

        # Prepare image data to be included in the response
        data = {'id': image.id, 'title': image.title, 'description': image.description,
                'upload_date': image.upload_date, 'image': image.image.url}

        return Response(data)

# view to handle creating a new image
class ImageCreateView(APIView):

    # Handle POST request to create a new image
    def post(self, request):
        user = get_user(request)
        if not user:
            return Response({'error': 'Unauthenticated!'})

        # extract the image data from the request
        title = request.data.get('title')
        description = request.data.get('description')
        image = request.data.get('image')

        if not title or not image or not description:
            return Response({'error': 'Title and image are required!'}, status=400)
        # create a new image object
        image = Image.objects.create(
            user=user, title=title, description=description, image=image)

        return Response({'message': 'Image created successfully!'}, status=201)

# view to handle image deletion
class ImageDeleteView(APIView):

    # Handle DELETE request to delete an image
    def delete(self, request, pk):
        user = get_user(request)
        if not user:
            return Response({'error': 'Unauthenticated!'})

        # Retrieve the image associated with the authenticated user and the specified pk
        image = Image.objects.filter(user=user, id=pk).first()

        # delete the image record from the database
        image.delete()

        return Response({'message': 'Image deleted successfully!'}, status=204)
