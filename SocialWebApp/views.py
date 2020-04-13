from django.shortcuts import render
from .serializers import PostSerializer,UserSerializer
from .models import Post
from AuthApp.models import User
from rest_framework.views import APIView
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser, FileUploadParser 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# Create your views here.

def index(request):
    return render(request,'index.html')

# api for all posts query
class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        posts = Post.objects.all().order_by('-id')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save(user=self.request.user)
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# api for logged in user detail data
class MyProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        UserData = User.objects.filter(phone=self.request.user)
        serializer = UserSerializer(UserData, many=True)
        return Response(serializer.data)

# api for search query
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UsersByFilter(request):
    if request.method == "POST":
        UserDataFiltered = User.objects.filter(phone=request.data["data"])|User.objects.filter(email=request.data["data"])|User.objects.filter(email=request.data["data"])|User.objects.filter(first_name__icontains=request.data["data"])|User.objects.filter(last_name__icontains=request.data["data"])
        serializer = UserSerializer(UserDataFiltered, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

