import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Shield, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Thermometer, Droplets, Wind, Activity, Users, Zap, MapPin } from 'lucide-react-native';

interface SensorData {
  temperature: number;
  humidity: number;
  airQuality: number;
  timestamp: string;
}

interface Alert {
  id: string;
  type: 'behavior' | 'health' | 'environment';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  animalCount: number;
}

export default function Dashboard() {
  const [riskLevel, setRiskLevel] = useState<'normal' | 'warning' | 'danger'>('normal');
  const [isDisinfecting, setIsDisinfecting] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 22.5,
    humidity: 68,
    airQuality: 85,
    timestamp: new Date().toLocaleTimeString(),
  });
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'behavior',
      message: '구역 A에서 비정상적 움직임 감지',
      severity: 'medium',
      timestamp: '14:32',
      animalCount: 3,
    },
    {
      id: '2',
      type: 'environment',
      message: '온도 상승 경고',
      severity: 'low',
      timestamp: '13:45',
      animalCount: 0,
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // 실제 데이터 새로고침 로직
    setTimeout(() => {
      setSensorData({
        ...sensorData,
        timestamp: new Date().toLocaleTimeString(),
      });
      setRefreshing(false);
    }, 1000);
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'normal': return '#059669';
      case 'warning': return '#F59E0B';
      case 'danger': return '#DC2626';
      default: return '#059669';
    }
  };

  const getRiskText = () => {
    switch (riskLevel) {
      case 'normal': return '정상';
      case 'warning': return '주의';
      case 'danger': return '위험';
      default: return '정상';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'normal': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'danger': return Shield;
      default: return CheckCircle;
    }
  };

  const RiskIcon = getRiskIcon();

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.farmName}>스마트 축사 A동</Text>
        <Text style={styles.lastUpdate}>
          마지막 업데이트: {sensorData.timestamp}
        </Text>
      </View>

      {/* 현재 위험도 */}
      <View style={[styles.riskCard, { borderLeftColor: getRiskColor() }]}>
        <View style={styles.riskHeader}>
          <RiskIcon size={28} color={getRiskColor()} />
          <Text style={[styles.riskLevel, { color: getRiskColor() }]}>
            {getRiskText()}
          </Text>
        </View>
        <Text style={styles.riskDescription}>
          현재 축사 내 모든 지표가 정상 범위입니다
        </Text>
      </View>

      {/* 최근 알림 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>최근 알림</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>전체보기</Text>
          </TouchableOpacity>
        </View>
        {recentAlerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <View style={[styles.alertBadge, { 
                backgroundColor: alert.severity === 'high' ? '#DC2626' : 
                                alert.severity === 'medium' ? '#F59E0B' : '#059669'
              }]} />
              <Text style={styles.alertTime}>{alert.timestamp}</Text>
            </View>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            {alert.animalCount > 0 && (
              <View style={styles.animalCount}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.animalCountText}>
                  {alert.animalCount}마리 관련
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* 자동 방역 상태 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>자동 방역 시스템</Text>
        <View style={styles.disinfectionCard}>
          <View style={styles.disinfectionHeader}>
            <Zap size={24} color={isDisinfecting ? '#F59E0B' : '#6B7280'} />
            <Text style={[styles.disinfectionStatus, {
              color: isDisinfecting ? '#F59E0B' : '#6B7280'
            }]}>
              {isDisinfecting ? '소독 진행중' : '대기 상태'}
            </Text>
          </View>
          <Text style={styles.disinfectionDetail}>
            마지막 소독: 오늘 12:00
          </Text>
          <TouchableOpacity 
            style={[styles.manualButton, { 
              backgroundColor: isDisinfecting ? '#F3F4F6' : '#059669' 
            }]}
            disabled={isDisinfecting}
          >
            <Text style={[styles.manualButtonText, {
              color: isDisinfecting ? '#9CA3AF' : '#FFFFFF'
            }]}>
              수동 소독 시작
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 센서 데이터 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>실시간 환경 정보</Text>
        <View style={styles.sensorGrid}>
          <View style={styles.sensorCard}>
            <Thermometer size={24} color="#DC2626" />
            <Text style={styles.sensorValue}>{sensorData.temperature}°C</Text>
            <Text style={styles.sensorLabel}>온도</Text>
            <Text style={styles.sensorStatus}>정상</Text>
          </View>
          <View style={styles.sensorCard}>
            <Droplets size={24} color="#3B82F6" />
            <Text style={styles.sensorValue}>{sensorData.humidity}%</Text>
            <Text style={styles.sensorLabel}>습도</Text>
            <Text style={styles.sensorStatus}>정상</Text>
          </View>
          <View style={styles.sensorCard}>
            <Wind size={24} color="#059669" />
            <Text style={styles.sensorValue}>{sensorData.airQuality}</Text>
            <Text style={styles.sensorLabel}>공기질</Text>
            <Text style={styles.sensorStatus}>양호</Text>
          </View>
        </View>
      </View>

      {/* 디지털트윈 시뮬레이션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI 예측 분석</Text>
        <View style={styles.simulationCard}>
          <View style={styles.simulationHeader}>
            <Activity size={24} color="#7C3AED" />
            <Text style={styles.simulationTitle}>질병 확산 예측</Text>
          </View>
          <View style={styles.simulationData}>
            <View style={styles.predictionItem}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.predictionText}>
                확산 위험도: 낮음 (2.3%)
              </Text>
            </View>
            <View style={styles.predictionItem}>
              <Users size={16} color="#6B7280" />
              <Text style={styles.predictionText}>
                예상 영향 범위: 구역 A 일부 (12마리)
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.simulationButton}
            onPress={() => router.push('/simulation')}
          >
            <Text style={styles.simulationButtonText}>
              상세 시뮬레이션 보기
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  farmName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  lastUpdate: {
    fontSize: 14,
    color: '#6B7280',
  },
  riskCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  riskDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  viewAll: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  alertMessage: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
  },
  animalCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animalCountText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  disinfectionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  disinfectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  disinfectionStatus: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  disinfectionDetail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  manualButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  manualButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sensorGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  sensorCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sensorValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  sensorLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  sensorStatus: {
    fontSize: 10,
    color: '#059669',
    fontWeight: '500',
  },
  simulationCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  simulationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  simulationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  simulationData: {
    marginBottom: 16,
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  predictionText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  simulationButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  simulationButtonText: {
    fontSize: 14,
    color: '#7C3AED',
    fontWeight: '500',
  },
});