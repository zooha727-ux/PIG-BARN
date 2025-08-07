import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, Users, MapPin, Filter } from 'lucide-react-native';

interface Alert {
  id: string;
  type: 'behavior' | 'health' | 'environment' | 'system';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  location: string;
  animalCount?: number;
  resolved: boolean;
}

export default function AlertsScreen() {
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'behavior',
      title: '비정상적 움직임 감지',
      message: '구역 A에서 돼지들의 비정상적인 집단 행동이 감지되었습니다.',
      severity: 'high',
      timestamp: '2024-01-15 14:32',
      location: '구역 A',
      animalCount: 5,
      resolved: false,
    },
    {
      id: '2',
      type: 'environment',
      title: '온도 상승 경고',
      message: '축사 내 온도가 설정 범위를 초과했습니다.',
      severity: 'medium',
      timestamp: '2024-01-15 13:45',
      location: '구역 B',
      resolved: true,
    },
    {
      id: '3',
      type: 'health',
      title: '건강 이상 의심',
      message: 'AI 분석 결과, 2마리에서 질병 초기 증상이 의심됩니다.',
      severity: 'high',
      timestamp: '2024-01-15 11:22',
      location: '구역 C',
      animalCount: 2,
      resolved: false,
    },
    {
      id: '4',
      type: 'system',
      title: '센서 통신 오류',
      message: '습도 센서 3번에서 통신 오류가 발생했습니다.',
      severity: 'low',
      timestamp: '2024-01-15 09:15',
      location: '구역 A',
      resolved: true,
    },
  ]);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unresolved') return !alert.resolved;
    if (filter === 'resolved') return alert.resolved;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#DC2626';
      case 'medium': return '#F59E0B';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '보통';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'behavior': return '행동이상';
      case 'health': return '건강관리';
      case 'environment': return '환경';
      case 'system': return '시스템';
      default: return '알 수 없음';
    }
  };

  const handleAlertPress = (alert: Alert) => {
    if (alert.type === 'behavior' && alert.title === '비정상적 움직임 감지') {
      router.push('/cctv');
    }
  };

  const renderAlert = ({ item }: { item: Alert }) => (
    <TouchableOpacity 
      style={styles.alertCard}
      onPress={() => handleAlertPress(item)}
    >
      <View style={styles.alertHeader}>
        <View style={styles.alertInfo}>
          <View style={[styles.severityBadge, { 
            backgroundColor: getSeverityColor(item.severity) 
          }]}>
            <Text style={styles.severityText}>
              {getSeverityText(item.severity)}
            </Text>
          </View>
          <Text style={styles.alertType}>{getTypeText(item.type)}</Text>
        </View>
        {item.resolved ? (
          <CheckCircle size={20} color="#059669" />
        ) : (
          <AlertTriangle size={20} color={getSeverityColor(item.severity)} />
        )}
      </View>
      
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertMessage}>{item.message}</Text>
      
      <View style={styles.alertFooter}>
        <View style={styles.alertDetails}>
          <View style={styles.detailItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.timestamp}</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          {item.animalCount && (
            <View style={styles.detailItem}>
              <Users size={14} color="#6B7280" />
              <Text style={styles.detailText}>{item.animalCount}마리</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>알림 관리</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#059669" />
        </TouchableOpacity>
      </View>

      {/* 필터 탭 */}
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterTabText, filter === 'all' && styles.activeFilterTabText]}>
            전체
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'unresolved' && styles.activeFilterTab]}
          onPress={() => setFilter('unresolved')}
        >
          <Text style={[styles.filterTabText, filter === 'unresolved' && styles.activeFilterTabText]}>
            미해결
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'resolved' && styles.activeFilterTab]}
          onPress={() => setFilter('resolved')}
        >
          <Text style={[styles.filterTabText, filter === 'resolved' && styles.activeFilterTabText]}>
            해결됨
          </Text>
        </TouchableOpacity>
      </View>

      {/* 알림 목록 */}
      <FlatList
        data={filteredAlerts}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.alertsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  filterButton: {
    padding: 8,
  },
  filterTabs: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#059669',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  alertsList: {
    padding: 16,
  },
  alertCard: {
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
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  severityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  alertType: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  alertFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  alertDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
});