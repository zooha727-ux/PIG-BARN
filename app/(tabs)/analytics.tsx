import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TrendingUp, TrendingDown, ChartBar as BarChart3, ChartPie as PieChart, Calendar, Download } from 'lucide-react-native';

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>분석 리포트</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={20} color="#059669" />
        </TouchableOpacity>
      </View>

      {/* 주요 지표 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>주요 지표 (최근 7일)</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <TrendingUp size={24} color="#059669" />
            <Text style={styles.metricValue}>98.2%</Text>
            <Text style={styles.metricLabel}>건강도</Text>
            <Text style={styles.metricChange}>+2.1%</Text>
          </View>
          <View style={styles.metricCard}>
            <TrendingDown size={24} color="#DC2626" />
            <Text style={styles.metricValue}>3건</Text>
            <Text style={styles.metricLabel}>알림 발생</Text>
            <Text style={styles.metricChange}>-5건</Text>
          </View>
          <View style={styles.metricCard}>
            <BarChart3 size={24} color="#3B82F6" />
            <Text style={styles.metricValue}>22.5°C</Text>
            <Text style={styles.metricLabel}>평균 온도</Text>
            <Text style={styles.metricChange}>+0.3°C</Text>
          </View>
          <View style={styles.metricCard}>
            <PieChart size={24} color="#F59E0B" />
            <Text style={styles.metricValue}>68%</Text>
            <Text style={styles.metricLabel}>평균 습도</Text>
            <Text style={styles.metricChange}>-2%</Text>
          </View>
        </View>
      </View>

      {/* 추세 분석 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>추세 분석</Text>
        <View style={styles.trendCard}>
          <Text style={styles.trendTitle}>질병 발생 예측</Text>
          <Text style={styles.trendDescription}>
            AI 분석 결과, 향후 3일간 질병 발생 확률이 낮습니다.
          </Text>
          <View style={styles.trendChart}>
            <Text style={styles.chartPlaceholder}>
              📊 차트 영역 (실제 구현시 차트 라이브러리 활용)
            </Text>
          </View>
        </View>
      </View>

      {/* 구역별 현황 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>구역별 현황</Text>
        <View style={styles.zoneCard}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>구역 A</Text>
            <View style={styles.zoneStatus}>
              <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.statusText}>정상</Text>
            </View>
          </View>
          <Text style={styles.zoneDetails}>돼지 수: 45마리 | 평균 온도: 22.3°C</Text>
        </View>
        <View style={styles.zoneCard}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>구역 B</Text>
            <View style={styles.zoneStatus}>
              <View style={[styles.statusDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.statusText}>주의</Text>
            </View>
          </View>
          <Text style={styles.zoneDetails}>돼지 수: 38마리 | 평균 온도: 24.1°C</Text>
        </View>
        <View style={styles.zoneCard}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>구역 C</Text>
            <View style={styles.zoneStatus}>
              <View style={[styles.statusDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.statusText}>정상</Text>
            </View>
          </View>
          <Text style={styles.zoneDetails}>돼지 수: 42마리 | 평균 온도: 21.8°C</Text>
        </View>
      </View>

      {/* 기간 선택 */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.periodButton}>
          <Calendar size={20} color="#059669" />
          <Text style={styles.periodButtonText}>분석 기간 변경</Text>
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
  downloadButton: {
    padding: 8,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
    marginTop: 2,
  },
  trendCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  trendDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  trendChart: {
    height: 120,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  zoneCard: {
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
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  zoneStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  zoneDetails: {
    fontSize: 14,
    color: '#6B7280',
  },
  periodButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  periodButtonText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '500',
    marginLeft: 8,
  },
});