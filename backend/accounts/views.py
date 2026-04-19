from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

User = get_user_model()


@api_view(['POST'])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user:
        return Response({
            "id": user.id,
            "username": user.username,
            "role": user.role
        })
    else:
        return Response({"error": "Invalid credentials"}, status=400)


@api_view(['POST'])
def register_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Missing fields"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        role="client"
    )

    return Response({
        "id": user.id,
        "username": user.username,
        "role": user.role
    })