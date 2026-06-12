from rest_framework import serializers
from .models import SearchActivity
from .models import TrackerDetection



class SearchActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchActivity
        fields = '__all__'
        read_only_fields = ['user']
class TrackerDetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerDetection
        fields = '__all__'
        