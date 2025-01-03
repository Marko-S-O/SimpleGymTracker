import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //alignItems: 'center',
    backgroundColor: '#4b5563',
    width: '100%',
    paddingVertical: 5,
    position: 'absolute',
    top: 0,
    zIndex: 1000,
  },
  tab: {
    color: '#f9fafb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#60a5fa',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    fontSize: 16,
    color: '#3b82f6',
    backgroundColor: '#f9fafb',
  },
  activeContent: {
    display: 'flex',
  },
  historyNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 5,
  },
  programTitle: {
    fontSize: 18,
    color: '#1F2937',
    fontWeight: 'bold',
  },
  programHeader: {
    marginBottom: 8,
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#CCCCFF', 
  },
  WorkoutHeader: {
    marginBottom: 8,
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#CCCCFF', 
  },  
  week: {
    marginBottom: 8,
    paddingLeft: 6,
    paddingTop: 7,
    paddingRight: 0,
    paddingBottom: 5,
    borderRadius: 8,
    backgroundColor: '#D2D2FF', 
  },
  exercise: {
    marginBottom: 2,
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#E5E7F8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },  
  day: {
    paddingTop: 4,
    paddingLeft: 5,
    paddingRight: 0,
    borderRadius: 6,
    backgroundColor: '#E0E0FF', 
  },
  button: {
    backgroundColor: '#6B7280',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  smallButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 5,
    width: 86,
    alignItems: 'center',  
    justifyContent: 'center',
    color: '#FFFFFF',     
  },
  mediumButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderRadius: 6,
    marginHorizontal: 4,
    width: 100,
    alignItems: 'center',  
    justifyContent: 'center',  
    color: '#FFFFFF',   
  },
  fixedButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 5,
    width: 107,
    height: 50,
    alignItems: 'center',  
    justifyContent: 'center', 
    color: '#FFFFFF',    
  },  
  largeButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 5,
    width: 170,
    alignItems: 'center',  
    justifyContent: 'center',   
    color: '#FFFFFF',  
  }, 
  modalButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 5,
    marginVertical: 10,
    width: 130,
    alignItems: 'center',  
    justifyContent: 'center',   
    color: '#FFFFFF',  
  },    
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
  }, 
  exerciseList: {
    width: '100%',
    padding: 7,
    color: '#3b82f6',
  },
  setInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, 
    justifyContent: 'space-between',
  },
  setInputField: {
    width: 50,
    marginHorizontal: 10, 
    padding: 8,
    textAlign: 'center',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 6,
    color: '#374151',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  overlay: {
    display: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
  numericInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  incrementButton: {
      paddingHorizontal: 5,
      paddingVertical: 5,
      backgroundColor: '#BBBBBB',
      borderRadius: 4,
      width: 24,
  },
  incrementButtonText: {
      fontSize: 18,
      color: '#fff',
  },
  inputField: {
      width: 45,
      textAlign: 'center',
      marginHorizontal: 5,
      padding: 5,
      borderColor: '#d1d5db',
      borderWidth: 1,
      borderRadius: 4,
      color: '#374151',
  }, 
  infoTextContainer: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginHorizontal: 5,
    padding: 5,
    flexDirection: 'row',
  },   
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F2937',    
  },
  normalText: {
    fontWeight: 'normal',
    fontSize: 16,
    color: '#1F2937',    
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
      width: '80%',
      backgroundColor: '#EEEEFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
  },
  messageText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  },

  cancelButton: {
      backgroundColor: '#6c757d',
  },
  tabBar: { 
    backgroundColor: '#4b5563', 
    height: 37, 
    padding: 0, 
    marginTop: 0 
  },
  tabBarIndicator: { 
    backgroundColor: '#E0E0FF' 
  },
  tabBarLabel: { 
    color: 
    '#f9fafb', 
    fontWeight: 'bold' 
  },
  stackNavigatorHeader: { 
    backgroundColor: '#4b5563', 
    height:30
  }

})
