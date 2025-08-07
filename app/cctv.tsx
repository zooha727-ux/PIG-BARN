import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Camera, TriangleAlert as AlertTriangle, MapPin, Clock, Users, Play, Pause, RotateCcw } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface DetectedAnimal {
  id: string;
  position: { x: number; y: number };
  behaviorType: 'aggressive' | 'lethargic' | 'abnormal_movement';
  confidence: number;
}

export default function CCTVScreen() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState('14:32:15');
  const [detectedAnimals] = useState<DetectedAnimal[]>([
    {
      id: '1',
      position: { x: 120, y: 80 },
      behaviorType: 'aggressive',
      confidence: 0.89,
    },
    {
      id: '2',
      position: { x: 200, y: 120 },
      behaviorType: 'abnormal_movement',
      confidence: 0.76,
    },
    {
      id: '3',
      position: { x: 80, y: 150 },
      behaviorType: 'lethargic',
      confidence: 0.82,
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getBehaviorColor = (type: string) => {
    switch (type) {
      case 'aggressive': return '#DC2626';
      case 'lethargic': return '#F59E0B';
      case 'abnormal_movement': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  const getBehaviorText = (type: string) => {
    switch (type) {
      case 'aggressive': return '공격적 행동';
      case 'lethargic': return '무기력 상태';
      case 'abnormal_movement': return '비정상 움직임';
      default: return '알 수 없음';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>CCTV 모니터링</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 카메라 정보 */}
      <View style={styles.cameraInfo}>
        <View style={styles.cameraDetails}>
          <Camera size={20} color="#059669" />
          <Text style={styles.cameraText}>구역 A - 카메라 #01</Text>
        </View>
        <View style={styles.alertBadge}>
          <AlertTriangle size={16} color="#DC2626" />
          <Text style={styles.alertText}>이상행동 감지</Text>
        </View>
      </View>

      {/* CCTV 화면 */}
      <View style={styles.videoSection}>
        <View style={styles.videoContainer}>
          {/* 실제 CCTV 피드 대신 시뮬레이션 이미지 */}
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1300355/pexels-photo-1300355.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.videoFeed}
            resizeMode="cover"
          />
          
          {/* AI 감지 오버레이 */}
          {detectedAnimals.map((animal) => (
            <View
              key={animal.id}
              style={[
                styles.detectionBox,
                {
                  left: animal.position.x,
                  top: animal.position.y,
                  borderColor: getBehaviorColor(animal.behaviorType),
                },
              ]}
            >
              <View style={[styles.detectionLabel, { backgroundColor: getBehaviorColor(animal.behaviorType) }]}>
                <Text style={styles.detectionText}>
                  {getBehaviorText(animal.behaviorType)} ({Math.round(animal.confidence * 100)}%)
                </Text>
              </View>
            </View>
          ))}
          
          {/* 재생 컨트롤 오버레이 */}
          <View style={styles.videoControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={24} color="#FFFFFF" />
              ) : (
                <Play size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton}>
              <RotateCcw size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* 시간 표시 */}
          <View style={styles.timeOverlay}>
            <Text style={styles.timeText}>{currentTime}</Text>
            <View style={[styles.recordingDot, { backgroundColor: isPlaying ? '#DC2626' : '#6B7280' }]} />
          </View>
        </View>
      </View>

      {/* 감지 결과 요약 */}
      <View style={styles.detectionSummary}>
        <Text style={styles.sectionTitle}>AI 감지 결과</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryInfo}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.summaryLocation}>구역 A</Text>
            </View>
            <View style={styles.summaryInfo}>
              <Clock size={20} color="#6B7280" />
              <Text style={styles.summaryTime}>14:32</Text>
            </View>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Users size={16} color="#6B7280" />
              <Text style={styles.statText}>감지된 개체: {detectedAnimals.length}마리</Text>
            </View>
            <View style={styles.statItem}>
              <AlertTriangle size={16} color="#DC2626" />
              <Text style={styles.statText}>위험도: 높음</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 개별 감지 결과 */}
      <View style={styles.detectionDetails}>
        <Text style={styles.sectionTitle}>개별 감지 내역</Text>
        {detectedAnimals.map((animal, index) => (
          <View key={animal.id} style={styles.detectionCard}>
            <View style={styles.detectionHeader}>
              <Text style={styles.animalId}>개체 #{index + 1}</Text>
              <View style={[styles.behaviorBadge, { backgroundColor: getBehaviorColor(animal.behaviorType) }]}>
                <Text style={styles.behaviorBadgeText}>
                  {getBehaviorText(animal.behaviorType)}
                </Text>
              </View>
            </View>
            <View style={styles.detectionInfo}>
              <Text style={styles.confidenceText}>
                신뢰도: {Math.round(animal.confidence * 100)}%
              </Text>
              <Text style={styles.positionText}>
                위치: ({animal.position.x}, {animal.position.y})
              </Text>
            </View>
            <Text style={styles.recommendationText}>
              권장사항: 즉시 격리 및 수의사 진료 필요
            </Text>
          </View>
        ))}
      </View>

      {/* 액션 버튼들 */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.emergencyButton}>
          <AlertTriangle size={20} color="#FFFFFF" />
          <Text style={styles.emergencyButtonText}>긴급 알림 발송</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.isolateButton}>
          <Text style={styles.isolateButtonText}>자동 격리 시작</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  cameraInfo: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cameraDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  alertText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
    marginLeft: 4,
  },
  videoSection: {
    margin: 16,
  },
  videoContainer: {
    position: 'relative',
    backgroundColor: '#000000',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  videoFeed: {
    width: '100%',
    height: 240,
  },
  detectionBox: {
    position: 'absolute',
    width: 80,
    height: 60,
    borderWidth: 2,
    borderRadius: 4,
  },
  detectionLabel: {
    position: 'absolute',
    top: -20,
    left: 0,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  detectionText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  videoControls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 20,
  },
  timeOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  detectionSummary: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryLocation: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
    fontWeight: '500',
  },
  summaryTime: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  detectionDetails: {
    margin: 16,
    marginTop: 0,
  },
  detectionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  animalId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  behaviorBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  behaviorBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  detectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  confidenceText: {
    fontSize: 12,
    color: '#6B7280',
  },
  positionText: {
    fontSize: 12,
    color: '#6B7280',
  },
  recommendationText: {
    fontSize: 12,
    color: '#F59E0B',
    fontStyle: 'italic',
  },
  actionSection: {
    margin: 16,
    marginTop: 0,
    gap: 12,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  isolateButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  isolateButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});