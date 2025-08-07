import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Users, TrendingUp, TriangleAlert as AlertTriangle, Clock, Activity } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SimulationZone {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  animalCount: number;
  infectedCount: number;
  position: { x: number; y: number };
}

export default function SimulationScreen() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zones] = useState<SimulationZone[]>([
    {
      id: 'A',
      name: '구역 A',
      riskLevel: 'high',
      animalCount: 45,
      infectedCount: 3,
      position: { x: 50, y: 80 },
    },
    {
      id: 'B',
      name: '구역 B',
      riskLevel: 'medium',
      animalCount: 38,
      infectedCount: 1,
      position: { x: 150, y: 120 },
    },
    {
      id: 'C',
      name: '구역 C',
      riskLevel: 'low',
      animalCount: 42,
      infectedCount: 0,
      position: { x: 100, y: 180 },
    },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 24);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#DC2626';
      case 'medium': return '#F59E0B';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  const getSpreadRadius = (riskLevel: string, time: number) => {
    const baseRadius = riskLevel === 'high' ? 30 : riskLevel === 'medium' ? 20 : 10;
    return baseRadius + (time * 2);
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
        <Text style={styles.title}>질병 확산 시뮬레이션</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 시뮬레이션 컨트롤 */}
      <View style={styles.controlSection}>
        <View style={styles.timeDisplay}>
          <Clock size={20} color="#6B7280" />
          <Text style={styles.timeText}>시뮬레이션 시간: {currentTime}시간 후</Text>
        </View>
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: isPlaying ? '#DC2626' : '#059669' }]}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '일시정지' : '시뮬레이션 시작'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 축사 레이아웃 시뮬레이션 */}
      <View style={styles.simulationSection}>
        <Text style={styles.sectionTitle}>축사 레이아웃 및 확산 예측</Text>
        <View style={styles.farmLayout}>
          {/* 축사 배경 */}
          <View style={styles.farmBackground}>
            <Text style={styles.farmLabel}>스마트 축사 A동</Text>
            
            {/* 구역들 */}
            {zones.map((zone) => (
              <View key={zone.id}>
                {/* 구역 표시 */}
                <View
                  style={[
                    styles.zone,
                    {
                      left: zone.position.x,
                      top: zone.position.y,
                      borderColor: getRiskColor(zone.riskLevel),
                    },
                  ]}
                >
                  <Text style={styles.zoneLabel}>{zone.name}</Text>
                  <Text style={styles.zoneCount}>{zone.animalCount}마리</Text>
                </View>
                
                {/* 확산 범위 표시 */}
                {zone.infectedCount > 0 && (
                  <View
                    style={[
                      styles.spreadCircle,
                      {
                        left: zone.position.x - getSpreadRadius(zone.riskLevel, currentTime) / 2,
                        top: zone.position.y - getSpreadRadius(zone.riskLevel, currentTime) / 2,
                        width: getSpreadRadius(zone.riskLevel, currentTime),
                        height: getSpreadRadius(zone.riskLevel, currentTime),
                        borderColor: getRiskColor(zone.riskLevel),
                      },
                    ]}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 예측 결과 */}
      <View style={styles.predictionSection}>
        <Text style={styles.sectionTitle}>AI 예측 결과</Text>
        
        <View style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <TrendingUp size={24} color="#DC2626" />
            <Text style={styles.predictionTitle}>확산 위험도 분석</Text>
          </View>
          <View style={styles.predictionContent}>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>현재 감염 추정:</Text>
              <Text style={styles.predictionValue}>4마리 (3.2%)</Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>24시간 후 예상:</Text>
              <Text style={[styles.predictionValue, { color: '#F59E0B' }]}>12마리 (9.6%)</Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>72시간 후 예상:</Text>
              <Text style={[styles.predictionValue, { color: '#DC2626' }]}>28마리 (22.4%)</Text>
            </View>
          </View>
        </View>

        <View style={styles.predictionCard}>
          <View style={styles.predictionHeader}>
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={styles.predictionTitle}>권장 조치사항</Text>
          </View>
          <View style={styles.actionList}>
            <View style={styles.actionItem}>
              <View style={styles.actionBullet} />
              <Text style={styles.actionText}>구역 A 즉시 격리 및 소독 실시</Text>
            </View>
            <View style={styles.actionItem}>
              <View style={styles.actionBullet} />
              <Text style={styles.actionText}>구역 B 예방적 소독 권장</Text>
            </View>
            <View style={styles.actionItem}>
              <View style={styles.actionBullet} />
              <Text style={styles.actionText}>전체 구역 모니터링 강화</Text>
            </View>
            <View style={styles.actionItem}>
              <View style={styles.actionBullet} />
              <Text style={styles.actionText}>수의사 긴급 진료 요청</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 구역별 상세 정보 */}
      <View style={styles.detailSection}>
        <Text style={styles.sectionTitle}>구역별 상세 현황</Text>
        {zones.map((zone) => (
          <View key={zone.id} style={styles.zoneDetailCard}>
            <View style={styles.zoneDetailHeader}>
              <Text style={styles.zoneDetailName}>{zone.name}</Text>
              <View style={[styles.riskBadge, { backgroundColor: getRiskColor(zone.riskLevel) }]}>
                <Text style={styles.riskBadgeText}>
                  {zone.riskLevel === 'high' ? '위험' : zone.riskLevel === 'medium' ? '주의' : '정상'}
                </Text>
              </View>
            </View>
            <View style={styles.zoneStats}>
              <View style={styles.statItem}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.statText}>총 {zone.animalCount}마리</Text>
              </View>
              <View style={styles.statItem}>
                <Activity size={16} color="#DC2626" />
                <Text style={styles.statText}>감염 의심 {zone.infectedCount}마리</Text>
              </View>
              <View style={styles.statItem}>
                <MapPin size={16} color="#6B7280" />
                <Text style={styles.statText}>확산 반경 {getSpreadRadius(zone.riskLevel, currentTime).toFixed(0)}m</Text>
              </View>
            </View>
          </View>
        ))}
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
  controlSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
    fontWeight: '500',
  },
  playButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  simulationSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  farmLayout: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  farmBackground: {
    height: 300,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    position: 'relative',
    padding: 16,
  },
  farmLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  zone: {
    position: 'absolute',
    width: 60,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  zoneLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  zoneCount: {
    fontSize: 10,
    color: '#6B7280',
  },
  spreadCircle: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 1000,
    backgroundColor: 'transparent',
    opacity: 0.3,
  },
  predictionSection: {
    margin: 16,
  },
  predictionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  predictionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  predictionContent: {
    gap: 12,
  },
  predictionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  predictionLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  predictionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  actionList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 12,
  },
  actionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  detailSection: {
    margin: 16,
    marginTop: 0,
  },
  zoneDetailCard: {
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
  zoneDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  zoneDetailName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  riskBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  riskBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  zoneStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});