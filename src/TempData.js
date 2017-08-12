export const tempData = () => {
    return {
        messageTypes: [
            { id: 1, name: 'ADT^A04', verboseName: 'PADIENT_REGISTRATION',  description: 'The patient registration message.'},
            { id: 2, name: 'ADT^A08', verboseName: 'PATIENT_UPDATE',  description: 'An update to the patient demographic details'},
            { id: 3, name: 'RDE^001', verboseName: 'PHARMACY_ORDER',  description: 'Drug prescription message. Also used when cancelling a drug prescription'},
            { id: 4, name: 'RDS^O13', verboseName: 'PHARMACY_DISPENSE',  description: 'Message used when dispensing drugs'},
            { id: 5, name: 'SIU^S12', verboseName: 'APPOINTMENT_SCHEDULING',  description: 'Message used when scheduling appointments. Also used when rescheduling, cancelling an appointment, and showing that an appointment was honored'},
            { id: 6, name: 'ORM^O01', verboseName: 'LAB_ORDER',  description: 'Message used when sending a lab order, e.g. a Viral Load Lab Order'},
            { id: 7, name: 'ORU^R01', verboseName: 'LAB_RESULT',  description: 'Message used when sending a lab result e.g. Viral Load Results'}
        ],
        entities: [
            {id: 1, name: 'IQCARE', address: null, description: 'The Electronic Medical Record sytem used at the CCC for patients\' CARE management'},
            {id: 2, name: 'ADT', address: null, description: 'ARV Dispensing Tool used at the CCC\'s pharmacy'},
            {id: 3, name: 'KENYAEMR', address: null, description: 'The Electronic Medical Record sytem used at the CCC for patients\' CARE management'},
            {id: 4, name: 'T4A', address: null, description: 'The system used to send out appointment reminders to patients'},
            {id: 5, name: 'CACHED_EID', address: null, description: 'A locally cached instanse of the EID data, for this facility.'},
            {id: 6, name: 'REMOTE_EID', address: null, description: 'The central EID server hosted @ NASCOP'}
        ]
    }
}