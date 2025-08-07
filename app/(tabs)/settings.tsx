import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { User, Bell, Shield, Smartphone, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoDisinfection, setAutoDisinfection] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>설정</Text>
      </View>

      {/* 프로필 섹션 */}
      <View style={styles.section}>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <User size={24} color="#FFFFFF" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>김농장</Text>
              <Text style={styles.userRole}>농장주</Text>
            </View>
          </View>
          <TouchableOpacity>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 알림 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>알림 설정</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>푸시 알림</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#D1D5DB', true: '#059669' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>긴급 알림</Text>
            </View>
            <Switch
              value={emergencyAlerts}
              onValueChange={setEmergencyAlerts}
              trackColor={{ false: '#D1D5DB', true: '#DC2626' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      {/* 시스템 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>시스템 설정</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Smartphone size={20} color="#6B7280" />
              <Text style={styles.settingLabel}>자동 소독</Text>
            </View>
            <Switch
              value={autoDisinfection}
              onValueChange={setAutoDisinfection}
              trackColor={{ false: '#D1D5DB', true: '#059669' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      {/* 메뉴 항목들 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>일반</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <HelpCircle size={20} color="#6B7280" />
              <Text style={styles.menuLabel}>도움말 및 지원</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <Shield size={20} color="#6B7280" />
              <Text style={styles.menuLabel}>개인정보 보호</Text>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 로그아웃 */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#DC2626" />
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      {/* 버전 정보 */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>버전 1.0.0</Text>
        <Text style={styles.copyrightText}>© 2024 스마트축사시스템</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  userRole: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 48,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '500',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});