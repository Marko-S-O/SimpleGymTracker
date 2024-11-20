import React from 'react'
import { Modal, View, Text, TouchableOpacity, Platform } from 'react-native'
import androidStyles from '../styles/styles.android'
import webStyles from '../styles/styles.web'

const styles = Platform.OS === 'web' ? webStyles : androidStyles

const ConfirmModal = ({ visible, onRequestClose, onConfirm, header, message }) => {

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onRequestClose} 
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={[styles.boldText, {textAlign: 'center'}]}>{header}</Text>                    
                    <Text style={[styles.normalText, {textAlign: 'center'}]}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={onRequestClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmModal