// A.N.I.H.A.N. — Shared Data, Auth Utilities & Helper Functions
'use strict';

// ROOT PATH RESOLVER
function getRootPath() {
  var p = window.location.pathname.replace(/\\/g, '/');
  if (p.includes('/buyer/') || p.includes('/farmer/') || p.includes('/ag-worker/') || p.includes('/admin/')) {
    return '../';
  }
  return '';
}

// ROLE HOME PATH RESOLVER
function getRoleHome(role) {
  var root = getRootPath();
  if (role === 'Farmer') return root + 'farmer/index.html';
  if (role === 'Buyer') return root + 'buyer/index.html';
  if (role === 'Ag Worker') return root + 'ag-worker/index.html';
  if (role === 'LGU Admin') return root + 'admin/index.html';
  return root + 'index.html';
}

// AUTH STATE
function getAuthUser() {
  try { return JSON.parse(localStorage.getItem('anihan_user')) || null; } catch(e) { return null; }
}
function setAuthUser(u) {
  if (u) localStorage.setItem('anihan_user', JSON.stringify(u));
  else localStorage.removeItem('anihan_user');
}
function logout() {
  setAuthUser(null);
  window.location.href = getRootPath() + 'index.html';
}
function requireAuth(allowedRoles) {
  var u = getAuthUser();
  var root = getRootPath();
  if (!u) {
    window.location.href = root + 'index.html';
    return null;
  }
  if (allowedRoles && allowedRoles.length && !allowedRoles.includes(u.role)) {
    window.location.href = getRoleHome(u.role);
    return null;
  }
  return u;
}

// MOCK USERS
var MOCK_USERS = {
  Farmer: {
    id: 'U001',
    name: 'Juan Dela Cruz',
    email: 'juan@anihan.ph',
    phone: '0917-889-2101',
    role: 'Farmer',
    initials: 'JD',
    avatar: 'https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?w=200&q=80',
    location: 'Guimba, Nueva Ecija',
    farmName: 'Rancho Dela Cruz Farmstead',
    passCode: '492011',
    lat: 15.6453,
    lng: 120.2974
  },
  Buyer: {
    id: 'U002',
    name: 'Maria Reyes',
    email: 'maria@anihan.ph',
    phone: '0922-451-9034',
    role: 'Buyer',
    initials: 'MR',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80',
    location: 'Cabanatuan City, Nueva Ecija',
    businessName: 'Reyes Fresh Produce & Meats',
    address: 'Stall #14, Cabanatuan Public Market',
    passCode: '882104',
    lat: 15.4869,
    lng: 120.9669
  },
  'Ag Worker': {
    id: 'U003',
    name: 'Enrique Dizon',
    email: 'enrique@anihan.ph',
    phone: '0919-332-8819',
    role: 'Ag Worker',
    initials: 'ED',
    avatar: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=200&q=80',
    location: 'Guimba Municipal Agri Office, Nueva Ecija',
    office: 'LGU Municipal Agriculture Office - Guimba (Barangay Extension Worker)',
    lat: 15.6453,
    lng: 120.2974
  },
  'LGU Admin': {
    id: 'ADM01',
    name: 'Engr. Arnold Mendoza',
    email: 'admin@anihan.ph',
    phone: '0917-555-0199',
    role: 'LGU Admin',
    initials: 'AM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    location: 'Guimba Municipal Hall, Nueva Ecija',
    office: 'Office of the Municipal Agriculturist — LGU Guimba',
    lat: 15.6453,
    lng: 120.2974
  }
};

// INITIAL LISTINGS DATA
var DEFAULT_LISTINGS = [
  { id: 1,  name: 'Kamatis (Diamante Max)',    english: 'Tomatoes',            type: 'crop',      category: 'Vegetables',   unit: 'kg',              farmerId: 'U001', farmer: 'Juan Dela Cruz',    farmerPhone: '0917-889-2101', farmerInitials: 'JD', location: 'Guimba, Nueva Ecija',      price: 42,    total: 1200, available: 740,  harvestDate: 'Nov 18-26, 2026', photo: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80', fulfillment: 'Both',     deliveryNotes: 'Free delivery within Guimba; P50 nearby.',                pickupAddress: 'Purok 4, Brgy. San Roque, Guimba',   rating: 4.8, ratingCount: 124, tag: 'Harvesting Soon',      details: 'Firm, naturally ripened tomatoes ideal for wet markets and wholesale.', status: 'active' },
  { id: 2,  name: 'Batangas Brahman Cattle',   english: 'Fattened Cattle',     type: 'livestock', category: 'Cattle',        unit: 'head',            farmerId: 'U001', farmer: 'Juan Dela Cruz',    farmerPhone: '0917-889-2101', farmerInitials: 'JD', location: 'Guimba, Nueva Ecija',      price: 42000, total: 3,    available: 2,    harvestDate: 'Nov 15-30, 2026', photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&q=80', fulfillment: 'Pick-up', deliveryNotes: 'Buyer must provide hauler truck.',                         pickupAddress: 'Rancho Dela Cruz, Brgy. San Roque',  rating: 4.9, ratingCount: 18,  tag: 'Vaccinated & Certified', details: 'Liveweight 380kg, healthy 2-year-old steer. Vet certified and dewormed.', status: 'active' },
  { id: 3,  name: 'Talong (Long Purple)',       english: 'Eggplant',            type: 'crop',      category: 'Vegetables',   unit: 'kg',              farmerId: 'F002', farmer: 'Rosa Santos',       farmerPhone: '0918-204-1188', farmerInitials: 'RS', location: 'San Fernando, Pampanga',   price: 38,    total: 850,  available: 520,  harvestDate: 'Nov 22-30, 2026', photo: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80', fulfillment: 'Delivery', deliveryNotes: 'Delivery to Metro Manila and nearby provinces.',           pickupAddress: '',                                   rating: 4.5, ratingCount: 89,  tag: 'Delivery Available',     details: 'Fresh, glossy Long Purple eggplants. Ideal for sauteed dishes and grilling.', status: 'active' },
  { id: 4,  name: 'Itlog ng Manok (Native)',    english: 'Native Chicken Eggs', type: 'eggs',      category: 'Eggs',         unit: 'tray (30 pcs)',   farmerId: 'F003', farmer: 'Pedro Manalo',      farmerPhone: '0935-776-9021', farmerInitials: 'PM', location: 'Munoz, Nueva Ecija',       price: 180,   total: 200,  available: 145,  harvestDate: 'Nov 10-25, 2026', photo: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&q=80', fulfillment: 'Both',     deliveryNotes: 'Careful packaging, delivery within 50km.',                pickupAddress: 'Purok 2, Brgy. Poblacion, Munoz',    rating: 4.7, ratingCount: 203, tag: 'Free Range',             details: 'Free-range native chicken eggs. Rich flavor, deep yellow yolk. No artificial feeds.', status: 'active' },
  { id: 5,  name: 'Kalabasa (Squash)',          english: 'Pumpkin / Squash',    type: 'crop',      category: 'Vegetables',   unit: 'kg',              farmerId: 'F004', farmer: 'Lito Bautista',     farmerPhone: '0928-112-4433', farmerInitials: 'LB', location: 'Talavera, Nueva Ecija',    price: 28,    total: 2000, available: 1800, harvestDate: 'Nov 5-20, 2026',  photo: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=600&q=80', fulfillment: 'Both',     deliveryNotes: 'Bulk delivery available for 100kg+.',                     pickupAddress: 'Brgy. San Juan, Talavera',            rating: 4.3, ratingCount: 67,  tag: 'Surplus Available',      details: 'Sweet, dense orange flesh. Ideal for ginataan, soup, and pastries.', status: 'active' },
  { id: 6,  name: 'Itlog ng Pato (Balut)',      english: 'Duck Eggs',           type: 'eggs',      category: 'Eggs',         unit: 'piece',           farmerId: 'F005', farmer: 'Carmen Villanueva', farmerPhone: '0917-550-9981', farmerInitials: 'CV', location: 'Pateros, Metro Manila',    price: 25,    total: 1000, available: 600,  harvestDate: 'Nov 1 - Dec 1, 2026', photo: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&q=80', fulfillment: 'Delivery', deliveryNotes: 'Same-day delivery in Metro Manila.',                       pickupAddress: '',                                   rating: 4.6, ratingCount: 311, tag: '18-Day Ready',           details: 'Traditional Pateros balut. 18-day incubated duck eggs. Classic delicacy.', status: 'active' },
  { id: 7,  name: 'Native Pig (Live)',          english: 'Swine / Baboy',       type: 'livestock', category: 'Swine',         unit: 'head',            farmerId: 'U001', farmer: 'Juan Dela Cruz',    farmerPhone: '0917-889-2101', farmerInitials: 'JD', location: 'Guimba, Nueva Ecija',      price: 8500,  total: 5,    available: 3,    harvestDate: 'Nov 20 - Dec 5, 2026', photo: 'https://images.unsplash.com/photo-1548681528-6a5c45dbe38f?w=600&q=80', fulfillment: 'Pick-up', deliveryNotes: 'Buyer arranges transport.',                                pickupAddress: 'Purok 4, Brgy. San Roque, Guimba',   rating: 4.4, ratingCount: 22,  tag: 'Healthy Stock',          details: 'Healthy native pig, 80kg liveweight. Good for lechon and pork supply. Dewormed.', status: 'active' },
  { id: 8,  name: 'Native Chicken (Live)',      english: 'Manok / Poultry',     type: 'livestock', category: 'Poultry',       unit: 'head',            farmerId: 'F006', farmer: 'Nena Garcia',       farmerPhone: '0945-883-2210', farmerInitials: 'NG', location: 'Zaragoza, Nueva Ecija',    price: 320,   total: 100,  available: 65,   harvestDate: 'Nov 12-28, 2026', photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80', fulfillment: 'Both',     deliveryNotes: 'Live delivery within Nueva Ecija.',                       pickupAddress: 'Brgy. Del Pilar, Zaragoza',          rating: 4.6, ratingCount: 88,  tag: 'Free Range',             details: 'Free-range native chicken. Tender, flavorful meat. No growth hormones.', status: 'active' },
  { id: 9,  name: 'Sibuyas Tagalog',            english: 'Native Red Onions',   type: 'crop',      category: 'Vegetables',   unit: 'kg',              farmerId: 'F007', farmer: 'Bert Flores',       farmerPhone: '0916-443-7722', farmerInitials: 'BF', location: 'Bongabon, Nueva Ecija',    price: 120,   total: 5000, available: 3500, harvestDate: 'Nov 25 - Dec 10, 2026', photo: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80', fulfillment: 'Both',    deliveryNotes: 'Minimum order 50kg for delivery.',                        pickupAddress: 'Brgy. San Isidro, Bongabon',         rating: 4.9, ratingCount: 456, tag: 'Premium Grade',          details: 'Premium Tagalog native red onions. Aromatic and pungent. Export quality.', status: 'active' },
  { id: 10, name: 'Mangga Carabao',             english: 'Carabao Mango',       type: 'crop',      category: 'Fruits',       unit: 'kg',              farmerId: 'F008', farmer: 'Divina Santos',     farmerPhone: '0917-882-9901', farmerInitials: 'DS', location: 'Guiguinto, Bulacan',       price: 85,    total: 3000, available: 2200, harvestDate: 'Nov 15 - Dec 15, 2026', photo: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=600&q=80', fulfillment: 'Both',    deliveryNotes: 'Box delivery available nationwide.',                      pickupAddress: 'Brgy. Sta. Cruz, Guiguinto, Bulacan', rating: 4.8, ratingCount: 267, tag: 'Export Quality',         details: 'World-famous Philippine Carabao mango. Sweet, fiberless. Ideal ripe or processed.', status: 'active' },
  { id: 11, name: 'Kambing (Native Goat)',      english: 'Live Goat',           type: 'livestock', category: 'Goat',          unit: 'head',            farmerId: 'F009', farmer: 'Romy Aguilar',      farmerPhone: '0929-334-1122', farmerInitials: 'RA', location: 'Nampicuan, Nueva Ecija',   price: 6500,  total: 8,    available: 5,    harvestDate: 'Nov 10 - Dec 15, 2026', photo: 'https://images.unsplash.com/photo-1524024974431-2be8f2d56562?w=600&q=80', fulfillment: 'Pick-up', deliveryNotes: 'Farm gate pickup only.',                                  pickupAddress: 'Brgy. Camias, Nampicuan',            rating: 4.2, ratingCount: 14,  tag: 'Healthy Stock',          details: 'Native goat, approx. 35kg liveweight. Good for karenderia and fiesta supply.', status: 'active' },
  { id: 12, name: 'Itlog ng Manok (Commercial)', english: 'Commercial Eggs',    type: 'eggs',      category: 'Eggs',         unit: 'tray (30 pcs)',   farmerId: 'U001', farmer: 'Juan Dela Cruz',    farmerPhone: '0917-889-2101', farmerInitials: 'JD', location: 'Guimba, Nueva Ecija',      price: 155,   total: 500,  available: 320,  harvestDate: 'Daily - Nov 2026', photo: 'https://images.unsplash.com/photo-1489726933853-01f5f6b53b77?w=600&q=80', fulfillment: 'Both',     deliveryNotes: 'Minimum 5 trays per delivery.',                           pickupAddress: 'Purok 4, Brgy. San Roque, Guimba',   rating: 4.5, ratingCount: 178, tag: 'Daily Fresh',            details: 'Large commercial eggs from healthy laying hens. Consistent quality daily.', status: 'active' }
];

// INITIAL ORDERS DATA (Rich Examples for Distribution & Logistics Monitor)
var DEFAULT_ORDERS = [
  { id: 'ANH-8921', listingId: 1,  itemName: 'Kamatis (Diamante Max)',   itemPhoto: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&q=80', qty: '220 kg',   total: 9240,  farmerId: 'U001', farmer: 'Juan Dela Cruz',       farmerPhone: '0917-889-2101', buyerId: 'U002', buyer: 'Maria Reyes',  buyerPhone: '0922-451-9034', buyerAddress: 'Stall #14, Cabanatuan Public Market', fulfillment: 'Delivery', currentStep: 3, date: 'Nov 15, 2026', status: 'active' },
  { id: 'ANH-8922', listingId: 2,  itemName: 'Batangas Brahman Cattle',  itemPhoto: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=200&q=80', qty: '1 head',   total: 42000, farmerId: 'U001', farmer: 'Juan Dela Cruz',       farmerPhone: '0917-889-2101', buyerId: 'U002', buyer: 'Maria Reyes',  buyerPhone: '0922-451-9034', buyerAddress: 'Rancho Dela Cruz, Brgy. San Roque',    fulfillment: 'Pick-up',  currentStep: 2, date: 'Nov 14, 2026', status: 'active' },
  { id: 'ANH-8923', listingId: 4,  itemName: 'Native Chicken Eggs',      itemPhoto: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&q=80', qty: '10 trays', total: 1800,  farmerId: 'F003', farmer: 'Pedro Manalo',        farmerPhone: '0935-776-9021', buyerId: 'U002', buyer: 'Maria Reyes',  buyerPhone: '0922-451-9034', buyerAddress: 'Purok 3, San Isidro, Cabanatuan',     fulfillment: 'Delivery', currentStep: 5, date: 'Nov 10, 2026', status: 'completed' },
  { id: 'ANH-8924', listingId: 7,  itemName: 'Native Pig (Live)',        itemPhoto: 'https://images.unsplash.com/photo-1548681528-6a5c45dbe38f?w=200&q=80', qty: '2 head',   total: 17000, farmerId: 'U001', farmer: 'Juan Dela Cruz',       farmerPhone: '0917-889-2101', buyerId: 'B002', buyer: 'Jose Ramos',   buyerPhone: '0920-667-3311', buyerAddress: 'Brgy. Mabini, San Jose City, NE',     fulfillment: 'Pick-up',  currentStep: 1, date: 'Nov 16, 2026', status: 'active' },
  { id: 'ANH-8925', listingId: 5,  itemName: 'Kalabasa (Squash)',        itemPhoto: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=200&q=80', qty: '350 kg',   total: 9800,  farmerId: 'F004', farmer: 'Lito Bautista',       farmerPhone: '0928-112-4433', buyerId: 'B003', buyer: 'Cynthia Lim',  buyerPhone: '0917-991-0022', buyerAddress: 'Public Market, Gapan City, Nueva Ecija', fulfillment: 'Delivery', currentStep: 4, date: 'Nov 16, 2026', status: 'active' },
  { id: 'ANH-8926', listingId: 9,  itemName: 'Sibuyas Tagalog',          itemPhoto: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&q=80', qty: '120 kg',   total: 14400, farmerId: 'F007', farmer: 'Bert Flores',         farmerPhone: '0916-443-7722', buyerId: 'U002', buyer: 'Maria Reyes',  buyerPhone: '0922-451-9034', buyerAddress: 'Stall #14, Cabanatuan Public Market', fulfillment: 'Delivery', currentStep: 2, date: 'Nov 15, 2026', status: 'active' },
  { id: 'ANH-8927', listingId: 11, itemName: 'Kambing (Native Goat)',    itemPhoto: 'https://images.unsplash.com/photo-1524024974431-2be8f2d56562?w=200&q=80', qty: '2 heads',  total: 13000, farmerId: 'F009', farmer: 'Romy Aguilar',        farmerPhone: '0929-334-1122', buyerId: 'B002', buyer: 'Jose Ramos',   buyerPhone: '0920-667-3311', buyerAddress: 'Farm Gate Gate #2, Nampicuan',        fulfillment: 'Pick-up',  currentStep: 4, date: 'Nov 13, 2026', status: 'active' },
  { id: 'ANH-8928', listingId: 6,  itemName: 'Itlog ng Pato (Balut)',    itemPhoto: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=200&q=80', qty: '250 pcs',  total: 6250,  farmerId: 'F005', farmer: 'Carmen Villanueva',   farmerPhone: '0917-550-9981', buyerId: 'U002', buyer: 'Maria Reyes',  buyerPhone: '0922-451-9034', buyerAddress: 'Purok 3, San Isidro, Cabanatuan',     fulfillment: 'Delivery', currentStep: 5, date: 'Nov 11, 2026', status: 'completed' }
];

// INITIAL ACCOUNTS DATA
var DEFAULT_ACCOUNTS = [
  { id: 'U001', name: 'Juan Dela Cruz',    role: 'Farmer',    phone: '0917-889-2101', email: 'juan@anihan.ph',    location: 'Guimba, Nueva Ecija',         status: 'Active',           passCode: '492011', registeredBy: 'U003', assistedBy: 'Enrique Dizon', lowTech: true,  listings: 4, orders: 2, note: 'Low-tech grower, RSBSA #03-49-08-004' },
  { id: 'F010', name: 'Danilo Ramos',      role: 'Farmer',    phone: '0918-771-3344', email: 'danilo@anihan.ph',  location: 'Brgy. San Roque, Guimba',     status: 'Active',           passCode: '718290', registeredBy: 'U003', assistedBy: 'Enrique Dizon', lowTech: true,  listings: 2, orders: 1, note: 'Non-literate smallholder, RSBSA #03-49-08-089' },
  { id: 'F011', name: 'Teresita Bautista', role: 'Farmer',    phone: '0929-440-1122', email: 'teresita@anihan.ph',location: 'Brgy. Cawayan, Guimba',       status: 'Pending Approval', passCode: '552194', registeredBy: 'U003', assistedBy: 'Enrique Dizon', lowTech: true,  listings: 0, orders: 0, note: 'New assisted registration, RSBSA #03-49-08-112' },
  { id: 'F012', name: 'Eduardo Santos',    role: 'Farmer',    phone: '0930-882-9900', email: 'eduardo@anihan.ph', location: 'Brgy. Subol, Guimba',         status: 'Active',           passCode: '934112', registeredBy: 'U003', assistedBy: 'Enrique Dizon', lowTech: true,  listings: 1, orders: 1, note: 'Assisted cattle & goat raiser' },
  { id: 'U002', name: 'Maria Reyes',       role: 'Buyer',     phone: '0922-451-9034', email: 'maria@anihan.ph',   location: 'Cabanatuan, Nueva Ecija',    status: 'Active',           passCode: '882104', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 0, orders: 3, note: 'Wholesale public market stall #14' },
  { id: 'F002', name: 'Rosa Santos',       role: 'Farmer',    phone: '0918-204-1188', email: 'rosa@anihan.ph',    location: 'San Fernando, Pampanga',      status: 'Active',           passCode: '314205', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 1, orders: 1, note: 'Independent egg & crop grower' },
  { id: 'F003', name: 'Pedro Manalo',      role: 'Farmer',    phone: '0935-776-9021', email: 'pedro@anihan.ph',   location: 'Munoz, Nueva Ecija',          status: 'Active',           passCode: '662019', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 1, orders: 0, note: 'Native poultry breeder' },
  { id: 'F004', name: 'Lito Bautista',     role: 'Farmer',    phone: '0928-112-4433', email: 'lito@anihan.ph',    location: 'Talavera, Nueva Ecija',       status: 'Active',           passCode: '448102', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 1, orders: 0, note: 'Squash & gourd producer' },
  { id: 'F005', name: 'Carmen Villanueva', role: 'Farmer',    phone: '0917-550-9981', email: 'carmen@anihan.ph',  location: 'Pateros, Metro Manila',       status: 'Active',           passCode: '190283', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 1, orders: 0, note: 'Duck egg & balut processor' },
  { id: 'F006', name: 'Nena Garcia',       role: 'Farmer',    phone: '0945-883-2210', email: 'nena@anihan.ph',    location: 'Zaragoza, Nueva Ecija',       status: 'Pending Approval', passCode: '773190', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 1, orders: 0, note: 'Web registration awaiting LGU verification' },
  { id: 'F007', name: 'Bert Flores',       role: 'Farmer',    phone: '0916-443-7722', email: 'bert@anihan.ph',    location: 'Bongabon, Nueva Ecija',       status: 'Active',           passCode: '228901', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 1, orders: 0, note: 'Red onion cooperative member' },
  { id: 'B002', name: 'Jose Ramos',        role: 'Buyer',     phone: '0920-667-3311', email: 'jose@anihan.ph',    location: 'San Jose City, Nueva Ecija',  status: 'Active',           passCode: '601928', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 0, orders: 1, note: 'Institutional hotel supplier' },
  { id: 'B003', name: 'Cynthia Lim',       role: 'Buyer',     phone: '0917-991-0022', email: 'cynthia@anihan.ph', location: 'Gapan City, Nueva Ecija',     status: 'Pending Approval', passCode: '512803', registeredBy: null,   assistedBy: null,            lowTech: false, listings: 0, orders: 0, note: 'Supermarket consolidator' }
];

// PERSISTENT DATA GETTERS / SETTERS
function getListings() {
  try {
    var stored = localStorage.getItem('anihan_listings');
    return stored ? JSON.parse(stored) : DEFAULT_LISTINGS;
  } catch(e) { return DEFAULT_LISTINGS; }
}
function saveListings(l) {
  localStorage.setItem('anihan_listings', JSON.stringify(l));
  window.LISTINGS_DB = l;
}

function getOrders() {
  try {
    var stored = localStorage.getItem('anihan_orders');
    var orders = stored ? JSON.parse(stored) : DEFAULT_ORDERS;
    if (!Array.isArray(orders) || orders.length === 0) {
      orders = DEFAULT_ORDERS.slice();
    }
    if (Array.isArray(orders)) {
      orders.forEach(function(o){
        var n = Number(o.total);
        o.total = (!isNaN(n) && n >= 0) ? n : 0;
      });
    }
    return orders;
  } catch(e) { return DEFAULT_ORDERS; }
}
function saveOrders(o) {
  if (Array.isArray(o)) {
    o.forEach(function(item){
      var n = Number(item.total);
      item.total = (!isNaN(n) && n >= 0) ? n : 0;
    });
  }
  localStorage.setItem('anihan_orders', JSON.stringify(o));
  window.ORDERS_DB = o;
}

function getAccounts() {
  try {
    var stored = localStorage.getItem('anihan_accounts');
    var accs = stored ? JSON.parse(stored) : DEFAULT_ACCOUNTS;
    // ensure passCodes exist
    if (Array.isArray(accs)) {
      var changed = false;
      accs.forEach(function(a){
        if (!a.passCode) {
          a.passCode = String(Math.floor(100000 + Math.random() * 900000));
          changed = true;
        }
        if (a.status === 'Pending') {
          a.status = 'Pending Approval';
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('anihan_accounts', JSON.stringify(accs));
      }
    }
    return accs;
  } catch(e) { return DEFAULT_ACCOUNTS; }
}
function saveAccounts(a) {
  localStorage.setItem('anihan_accounts', JSON.stringify(a));
  window.ACCOUNTS_DB = a;
}

// BIND TO WINDOW
window.LISTINGS_DB = getListings();
window.ORDERS_DB   = getOrders();
window.ACCOUNTS_DB = getAccounts();

// SHARED CHAT STORE
var DEFAULT_CHATS = {
  'ANH-8921': [
    { from: 'buyer',  name: 'Maria Reyes',    msg: 'Kamusta po! Just confirming &mdash; will the 220kg kamatis arrive on Friday morning?' },
    { from: 'farmer', name: 'Juan Dela Cruz', msg: 'Opo Mam Maria. Fresh pick kami Huwebes hapon, tapos deliver Friday 6:00-8:00am sa stall niyo sa palengke.' },
    { from: 'buyer',  name: 'Maria Reyes',    msg: 'Salamat po Mang Juan! Nakaready na po ang payment and pwesto.' }
  ],
  'ANH-8922': [
    { from: 'buyer',  name: 'Maria Reyes',    msg: 'Mang Juan, anong oras po pwede pumunta ang truck para sa Batangas steer?' },
    { from: 'farmer', name: 'Juan Dela Cruz', msg: 'Magandang araw. 7:00am onwards po sa Rancho Dela Cruz, Brgy. San Roque. Kumpleto po ang vet certificate at clearance.' }
  ]
};

function getChatMessages(orderId) {
  try {
    var store = JSON.parse(localStorage.getItem('anihan_chats')) || {};
    return store[orderId] || DEFAULT_CHATS[orderId] || [];
  } catch(e) { return DEFAULT_CHATS[orderId] || []; }
}
function appendChatMessage(orderId, msgObj) {
  try {
    var store = JSON.parse(localStorage.getItem('anihan_chats')) || {};
    if (!store[orderId]) store[orderId] = (DEFAULT_CHATS[orderId] || []).slice();
    store[orderId].push(msgObj);
    localStorage.setItem('anihan_chats', JSON.stringify(store));
    return store[orderId];
  } catch(e) { return []; }
}

// HELPERS
function renderStars(r) {
  var f = Math.floor(r), h = (r - f) >= 0.5 ? 1 : 0, e = 5 - f - h, s = '<span class="stars">';
  for (var i = 0; i < f; i++) s += '<span class="star full">&#9733;</span>';
  if (h) s += '<span class="star half">&#9733;</span>';
  for (var i = 0; i < e; i++) s += '<span class="star empty">&#9734;</span>';
  return s + '<span class="rating-val">' + r.toFixed(1) + '</span></span>';
}

function getFulfillmentBadge(m) {
  if (m === 'Pick-up') return '<span class="badge badge-pickup">Pick-up Only</span>';
  if (m === 'Delivery') return '<span class="badge badge-delivery">Delivery</span>';
  return '<span class="badge badge-both">Pick-up &amp; Delivery</span>';
}

function getCategoryTag(t) {
  var map = { crop: 'Crop', livestock: 'Livestock', eggs: 'Eggs &amp; Poultry' };
  return '<span class="cat-tag cat-' + t + '">' + (map[t] || t) + '</span>';
}

function getStepLabels(fulfillment) {
  var isPickup = fulfillment === 'Pick-up';
  return [
    'Order Confirmed',
    'Harvested / Prepped',
    isPickup ? 'Ready for Pick-up' : 'In Transit',
    isPickup ? 'Buyer Arrived' : 'Out for Delivery',
    isPickup ? 'Handed Over' : 'Delivered & Confirmed'
  ];
}

function renderOrderStepper(order) {
  var labels = getStepLabels(order.fulfillment);
  var pct = ((order.currentStep - 1) / 4) * 100;
  var h = '<div class="stepper"><div class="stepper-bar"><div class="stepper-fill" style="width:' + pct + '%"></div></div><div class="stepper-steps">';
  labels.forEach(function(lbl, i) {
    var sn = i + 1;
    var done = order.currentStep > sn;
    var curr = order.currentStep === sn;
    h += '<div class="step-item' + (done ? ' done' : curr ? ' current' : '') + '">' +
         '<div class="step-dot">' + (done ? '&#10003;' : sn) + '</div>' +
         '<div class="step-lbl">' + lbl + '</div></div>';
  });
  return h + '</div></div>';
}

// SHARED NAV INITIALIZATION
function initSharedNav() {
  var user = getAuthUser();
  var nav = document.getElementById('mainNav');
  var chip = document.getElementById('userChip');
  var lb = document.getElementById('logoutBtn');
  var brandLink = document.querySelector('.brand');
  var path = window.location.pathname.replace(/\\/g, '/');
  var root = getRootPath();

  if (brandLink && user) {
    brandLink.href = 'index.html';
  }

  // Display return banner if in assisted farmer session
  checkAssistedFarmerBanner(user);

  if (nav && user) {
    var isP = function(pg) { return path.endsWith('/' + pg) || path.endsWith(pg); };
    var links = '';

    if (user.role === 'Buyer') {
      // Buyer ONLY buys, NOT sell
      links = '<a href="index.html" class="nav-link' + (isP('index.html') || path.endsWith('/buyer/') ? ' active' : '') + '">Dashboard</a>' +
              '<a href="shop.html" class="nav-link' + (isP('shop.html') ? ' active' : '') + '">Browse Harvests</a>' +
              '<a href="orders.html" class="nav-link' + (isP('orders.html') ? ' active' : '') + '">My Orders</a>' +
              '<a href="chat.html" class="nav-link' + (isP('chat.html') ? ' active' : '') + '">Messages</a>' +
              '<a href="account.html" class="nav-link' + (isP('account.html') ? ' active' : '') + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>Account Profile</a>';
    } else if (user.role === 'Farmer') {
      // Farmer sells crops and animals/eggs
      links = '<a href="index.html" class="nav-link' + (isP('index.html') || path.endsWith('/farmer/') ? ' active' : '') + '">Dashboard</a>' +
              '<a href="sell.html" class="nav-link' + (isP('sell.html') ? ' active' : '') + '">My Listings</a>' +
              '<a href="orders.html" class="nav-link' + (isP('orders.html') ? ' active' : '') + '">Orders Tracker</a>' +
              '<a href="chat.html" class="nav-link' + (isP('chat.html') ? ' active' : '') + '">Messages</a>' +
              '<a href="shop.html" class="nav-link' + (isP('shop.html') ? ' active' : '') + '">Market Hub</a>' +
              '<a href="account.html" class="nav-link' + (isP('account.html') ? ' active' : '') + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="vertical-align:-2px;margin-right:4px"><circle cx="12" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/></svg>Farm Profile</a>';
    } else if (user.role === 'Ag Worker') {
      // Ag Worker registers low-tech farmers & monitors distribution of their registered farmers only
      links = '<a href="index.html" class="nav-link' + (isP('index.html') || path.endsWith('/ag-worker/') ? ' active' : '') + '">My Registered Farmers</a>' +
              '<a href="orders.html" class="nav-link' + (isP('orders.html') ? ' active' : '') + '">Distribution Monitor</a>';
    } else if (user.role === 'LGU Admin') {
      // LGU Admin manages all accounts, surveillance dashboard, over-harvest graphs, distribution monitor
      links = '<a href="index.html" class="nav-link' + (isP('index.html') || path.endsWith('/admin/') ? ' active' : '') + '">Surveillance Dashboard</a>' +
              '<a href="accounts.html" class="nav-link' + (isP('accounts.html') ? ' active' : '') + '">Manage Accounts</a>' +
              '<a href="graphs.html" class="nav-link' + (isP('graphs.html') ? ' active' : '') + '">Over-Harvest Graphs</a>' +
              '<a href="orders.html" class="nav-link' + (isP('orders.html') ? ' active' : '') + '">Distribution Monitor</a>';
    }

    nav.innerHTML = links;
  }

  if (chip && user) {
    var avContent = user.avatar
      ? '<img src="' + user.avatar + '" alt="' + user.name + '" style="width:100%;height:100%;object-fit:cover">'
      : (user.initials || user.name.slice(0, 2).toUpperCase());

    var subRole = user.role === 'LGU Admin' ? 'LGU Admin' : user.role === 'Ag Worker' ? 'Barangay Ag Worker' : user.role;

    chip.innerHTML = '<span class="chip-av">' + avContent + '</span>' +
                     '<div class="chip-info"><strong>' + user.name + '</strong><small>' + subRole + ' &bull; Active</small></div>' +
                     '<span class="chip-edit-icon" title="View details">' +
                       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' +
                     '</span>';
    chip.style.display = 'flex';
    chip.title = 'Account details';
    chip.onclick = function() {
      if (user.role === 'Buyer' || user.role === 'Farmer') {
        window.location.href = 'account.html';
      }
    };
  }

  if (lb) {
    lb.addEventListener('click', logout);
  }

  // If logged in via Ag Worker pass code, add prominent "Back to Ag Worker" button to topbar
  if (user && user.switchedFromAgWorker) {
    var topbarRight = document.querySelector('.topbar-right');
    if (topbarRight && !document.getElementById('backToAgBtn')) {
      var backBtn = document.createElement('button');
      backBtn.id = 'backToAgBtn';
      backBtn.className = 'btn btn-sm';
      backBtn.style.cssText = 'background:#f59e0b;color:#1e293b;font-weight:800;border:none;margin-right:8px;display:inline-flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.15);padding:6px 14px;border-radius:6px;';
      backBtn.innerHTML = '&#8592; Back to Ag Worker';
      backBtn.onclick = returnToAgWorkerPortal;
      topbarRight.insertBefore(backBtn, topbarRight.firstChild);
    }
  }
}

// ASSISTED SESSION SWITCHING (Ag Worker to Farmer using Pass Code)
function loginAsFarmerForAgWorker(farmerId, passCode) {
  var accounts = getAccounts();
  var farmer = accounts.find(function(a){ return a.id === farmerId; });
  if (!farmer) {
    alert('Farmer account record not found.');
    return;
  }
  if (farmer.status !== 'Active') {
    alert('This account is currently ' + farmer.status + ' by LGU Admin. Only approved active farmers can post listings.');
    return;
  }

  var farmerSession = {
    id: farmer.id,
    name: farmer.name,
    email: farmer.email || (farmer.name.toLowerCase().replace(/[^a-z]/g,'') + '@anihan.ph'),
    phone: farmer.phone || '0917-889-2101',
    role: 'Farmer',
    initials: farmer.name.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase(),
    avatar: 'https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?w=200&q=80',
    location: farmer.location || 'Guimba, Nueva Ecija',
    farmName: farmer.name + "'s Farmstead",
    passCode: farmer.passCode,
    assistedByWorker: 'Enrique Dizon',
    assistedWorkerId: 'U003',
    switchedFromAgWorker: true
  };

  setAuthUser(farmerSession);
  var root = getRootPath();
  window.location.href = root + 'farmer/sell.html';
}

function returnToAgWorkerPortal() {
  var agWorker = MOCK_USERS['Ag Worker'];
  setAuthUser(agWorker);
  var root = getRootPath();
  window.location.href = root + 'ag-worker/index.html';
}

function checkAssistedFarmerBanner(user) {
  if (!user || !user.switchedFromAgWorker) return;
  if (document.getElementById('assistedWorkerBanner')) return;

  var b = document.createElement('div');
  b.id = 'assistedWorkerBanner';
  b.style.cssText = 'background:#14532d;color:#fff;padding:10px 24px;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:space-between;position:sticky;top:68px;z-index:999;box-shadow:0 3px 10px rgba(0,0,0,.18);border-bottom:2px solid #facc15;flex-wrap:wrap;gap:10px;';
  b.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">' +
      '<strong style="background:#facc15;color:#1e293b;padding:3px 8px;border-radius:4px;font-size:11px;font-weight:800;">&#9888; AG WORKER ASSISTED MODE</strong>' +
      '<span>You are logged into <strong>' + user.name + '</strong> (PIN: <code style="background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:4px;font-weight:800;letter-spacing:1px">' + (user.passCode || 'N/A') + '</code>) to help sell crops &amp; animals.</span>' +
    '</span>' +
    '<button onclick="returnToAgWorkerPortal()" style="background:#facc15;color:#1e293b;border:0;border-radius:6px;padding:6px 14px;font-weight:800;font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">&#8592; Back to Ag Worker Portal</button>';
  
  var topbar = document.querySelector('.topbar');
  if (topbar && topbar.parentNode) {
    topbar.parentNode.insertBefore(b, topbar.nextSibling);
  }
}

window.loginAsFarmerForAgWorker = loginAsFarmerForAgWorker;
window.returnToAgWorkerPortal = returnToAgWorkerPortal;

// AVATAR PRESETS HELPER
window.AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?w=200&q=80',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
];

// TOAST NOTIFICATIONS
var _tt;
function showToast(msg, type) {
  var el = document.getElementById('toastEl');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toastEl';
    document.body.appendChild(el);
  }
  el.className = 'toast-notif toast-' + (type || 'success') + ' show';
  el.textContent = msg;
  clearTimeout(_tt);
  _tt = setTimeout(function() { el.classList.remove('show'); }, 3400);
}

// MODAL OPEN / CLOSE
function openModal(id) {
  var m = document.getElementById(id);
  if (m) {
    m.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  var m = typeof id === 'string' ? document.getElementById(id) : id;
  if (m) {
    m.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// REAL-TIME WEATHER WIDGET (Uiverse card design by zanina-yassine)
function renderLiveWeatherWidget(targetElementId, locationName, role) {
  var el = document.getElementById(targetElementId);
  if (!el) return;

  function update() {
    var now = new Date();
    var timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
    var dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    var loc = locationName || (role === 'Farmer' ? 'Guimba, Nueva Ecija' : 'Cabanatuan City, Nueva Ecija');

    var isFarmer = role === 'Farmer';
    var temp = isFarmer ? 31 : 30;
    var heatIdx = isFarmer ? '35' + String.fromCharCode(176) + 'C' : '34' + String.fromCharCode(176) + 'C';
    var hum = isFarmer ? '72%' : '68%';
    var rainRisk = isFarmer ? '15%' : '10%';
    var wind = isFarmer ? '12 km/h ENE' : '14 km/h E';
    var advisory = isFarmer
      ? 'Favorable harvest window. Ensure clean hydration & shade for cattle and poultry pens.'
      : 'Clear road conditions along arterial corridors. Recommended receiving window open.';

    el.innerHTML =
      '<div class="weather-bar">' +
        '<div class="wx-card' + (isFarmer ? '' : ' wx-card-blue') + '">' +
          '<div class="wx-anim-container">' +
            '<div class="wx-cloud wx-front"><span class="wx-left-front"></span><span class="wx-right-front"></span></div>' +
            '<span class="wx-sun wx-sunshine"></span>' +
            '<span class="wx-sun"></span>' +
            '<div class="wx-cloud wx-back"><span class="wx-left-back"></span><span class="wx-right-back"></span></div>' +
          '</div>' +
          '<div class="wx-card-header">' +
            '<span>' + loc + '</span>' +
            '<span>' + dateStr + '</span>' +
          '</div>' +
          '<span class="wx-temp">' + temp + String.fromCharCode(176) + '</span>' +
          '<div class="wx-temp-scale"><span>Celcius</span></div>' +
        '</div>' +
        '<div class="wx-info-panel' + (isFarmer ? '' : ' wx-info-panel-blue') + '">' +
          '<div class="wx-live-badge">&#9899; LIVE AGROMET</div>' +
          '<div class="wx-clock">' + timeStr + '</div>' +
          '<div class="wx-advisory">' + advisory + '</div>' +
          '<div class="wx-stats">' +
            '<div class="wx-stat"><span>Humidity</span><strong>' + hum + '</strong></div>' +
            '<div class="wx-stat"><span>Rain Risk</span><strong>' + rainRisk + '</strong></div>' +
            '<div class="wx-stat"><span>Heat Index</span><strong>' + heatIdx + '</strong></div>' +
            '<div class="wx-stat"><span>Wind</span><strong>' + wind + '</strong></div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  update();
  setInterval(update, 1000);
}

window.getAuthUser = getAuthUser;
window.setAuthUser = setAuthUser;
window.logout = logout;
window.requireAuth = requireAuth;
window.getRootPath = getRootPath;
window.getRoleHome = getRoleHome;
window.MOCK_USERS = MOCK_USERS;
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
window.renderLiveWeatherWidget = renderLiveWeatherWidget;

document.addEventListener('DOMContentLoaded', function() {
  initSharedNav();
  document.querySelectorAll('[data-close-modal]').forEach(function(b) {
    b.addEventListener('click', function() {
      var m = b.closest('.modal-backdrop');
      if (m) closeModal(m.id);
    });
  });
  document.querySelectorAll('.modal-backdrop').forEach(function(m) {
    m.addEventListener('click', function(e) {
      if (e.target === m) closeModal(m.id);
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach(function(m) {
        closeModal(m.id);
      });
    }
  });
});
