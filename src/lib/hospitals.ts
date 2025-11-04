export type Hospital = {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: 'Public' | 'Private' | 'Clinic';
  distance: number;
};

export const mockHospitals: Hospital[] = [
    { id: '1', name: 'Government General Hospital, Chennai', address: 'Rajiv Gandhi Salai, Park Town, Chennai, Tamil Nadu 600003', phone: '044-25305000', type: 'Public', distance: 2.5 },
    { id: '2', name: 'Apollo Hospitals, Greams Road', address: '21, Greams Road, Thousand Lights, Chennai, Tamil Nadu 600006', phone: '044-28293333', type: 'Private', distance: 5.1 },
    { id: '3', name: 'MIOT International', address: '4/112, Mount Poonamallee Rd, Sathya Nagar, Manapakkam, Chennai, Tamil Nadu 600089', phone: '044-42002288', type: 'Private', distance: 12.8 },
    { id: '4', 'name': 'Stanley Medical College Hospital', 'address': 'No. 1, Old Jail Rd, Royapuram, Chennai, Tamil Nadu 600001', 'phone': '044-25280581', 'type': 'Public', 'distance': 3.2 },
    { id: '5', name: 'Vijaya Hospital', address: '434, N.S.K. Salai, Vadapalani, Chennai, Tamil Nadu 600026', phone: '044-66616661', type: 'Private', distance: 8.5 },
    { id: '6', name: 'Government Kilpauk Medical College', address: '822, Poonamallee High Rd, Near Ega Theatre, Kilpauk, Chennai, Tamil Nadu 600010', phone: '044-26412979', type: 'Public', distance: 6.7 },
    { id: '7', name: 'Fortis Malar Hospital', address: '52, 1st Main Rd, Gandhi Nagar, Adyar, Chennai, Tamil Nadu 600020', phone: '044-42892222', type: 'Private', distance: 9.3 },
    { id: '8', name: 'Primary Health Centre, Velachery', address: '15, Velachery Main Rd, V.O.C Nagar, Doctor Seetaram Nagar, Velachery, Chennai', phone: 'N/A', type: 'Clinic', distance: 11.1 },
];
