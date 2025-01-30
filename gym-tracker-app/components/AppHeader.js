import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfirmModal from '../components/ConfirmModal';
import { refreshAndSetData } from '../reducers/dataActions';
import { useSelector, useDispatch } from 'react-redux';
import androidStyles from '../styles/styles.android';
import webStyles from '../styles/styles.web';

export default function AppHeader() {
    const styles = Platform.OS === 'web' ? webStyles : androidStyles;
    const state = useSelector((state) => state.data);
    const dispatch = useDispatch();

    const [refreshModalVisible, setRefreshModalVisible] = useState(false);

    const refreshData = () => {
        dispatch(refreshAndSetData());
        setRefreshModalVisible(false);
    };

    return (
        <View style={styles.appHeader}>
            <Text style={styles.appHeaderText}>
                SimpleGymTracker v. 0.9.1 - {state.userId}
            </Text>
            <TouchableOpacity
                onPress={() => setRefreshModalVisible(true)}
                style={{ marginRight: 15, marginBottom: 10 }}
            >
                <Icon name="refresh" size={24} color="#fff" />
                <ConfirmModal
                    visible={refreshModalVisible}
                    onConfirm={refreshData}
                    onRequestClose={() => setRefreshModalVisible(false)}
                    header="Synchronize App and Server Data"
                    message="Warning: this will void unsaved changes in WORKOUT and PROGRAM tabs. Proceed?"
                />
            </TouchableOpacity>
        </View>
    );
}
