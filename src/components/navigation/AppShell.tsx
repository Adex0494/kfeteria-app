import { ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import BottomNav from '@/components/navigation/BottomNav';
import SidebarNav from '@/components/navigation/SidebarNav';
import { colors } from '@/theme/colors';

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const { width } = useWindowDimensions();
  const showSidebar = width >= 900;

  return (
    <View style={styles.root}>
      <View style={styles.frame}>
        {showSidebar ? <SidebarNav /> : null}
        <View style={styles.mainColumn}>
          <View style={styles.content}>{children}</View>
          {showSidebar ? null : <BottomNav />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.carbon,
  },
  frame: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.carbon,
  },
  mainColumn: {
    flex: 1,
    backgroundColor: colors.ivoryBackground,
  },
  content: {
    flex: 1,
  },
});
