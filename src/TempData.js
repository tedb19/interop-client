export const tempData = () => {
    return {
        messageTypes: [
            { id: 1, name: 'ADT^A04', verboseName: 'PADIENT_REGISTRATION',  description: 'The patient registration message.', status: 'ACTIVE'},
            { id: 2, name: 'ADT^A08', verboseName: 'PATIENT_UPDATE',  description: 'An update to the patient demographic details', status: 'INACTIVE'},
            { id: 3, name: 'RDE^001', verboseName: 'PHARMACY_ORDER',  description: 'Drug prescription message. Also used when cancelling a drug prescription', status: 'ACTIVE'},
            { id: 4, name: 'RDS^O13', verboseName: 'PHARMACY_DISPENSE',  description: 'Message used when dispensing drugs', status: 'ACTIVE'},
            { id: 5, name: 'SIU^S12', verboseName: 'APPOINTMENT_SCHEDULING',  description: 'Message used when scheduling appointments. Also used when rescheduling, cancelling an appointment, and showing that an appointment was honored', status: 'ACTIVE'},
            { id: 6, name: 'ORM^O01', verboseName: 'LAB_ORDER',  description: 'Message used when sending a lab order, e.g. a Viral Load Lab Order', status: 'ACTIVE'},
            { id: 7, name: 'ORU^R01', verboseName: 'LAB_RESULT',  description: 'Message used when sending a lab result e.g. Viral Load Results', status: 'ACTIVE'}
        ],
        entities: [
            {id: 1, name: 'IQCARE', address: null, description: 'The Electronic Medical Record sytem used at the CCC for patients\' CARE management', status: 'ACTIVE'},
            {id: 2, name: 'ADT', address: null, description: 'ARV Dispensing Tool used at the CCC\'s pharmacy', status: 'ACTIVE'},
            {id: 3, name: 'KENYAEMR', address: null, description: 'The Electronic Medical Record sytem used at the CCC for patients\' CARE management', status: 'ACTIVE'},
            {id: 4, name: 'T4A', address: null, description: 'The system used to send out appointment reminders to patients', status: 'ACTIVE'},
            {id: 5, name: 'CACHED_EID', address: null, description: 'A locally cached instanse of the EID data, for this facility.', status: 'ACTIVE'},
            {id: 6, name: 'REMOTE_EID', address: null, description: 'The central EID server hosted @ NASCOP', status: 'ACTIVE'}
        ],
        subscriptions: [
            {messageType: 'PATIENT_REGISTRATION', subscribers: ['IQCARE', 'ADT', 'KENYAEMR', 'T4A', 'MPI']},
            {messageType: 'PATIENT_UPDATE', subscribers: ['IQCARE', 'ADT', 'KENYAEMR', 'T4A', 'MPI']},
            {messageType: 'VIRAL_LOAD_RESULTS', subscribers: ['IQCARE', 'ADT', 'KENYAEMR']},
            {messageType: 'PHARMACY_ORDER', subscribers: ['IQCARE', 'KENYAEMR']},
            {messageType: 'APPOINTMENT_SCHEDULE', subscribers: ['IQCARE', 'ADT', 'KENYAEMR', 'T4A']}
        ]
    }
}