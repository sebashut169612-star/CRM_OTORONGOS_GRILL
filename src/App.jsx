import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plus, DollarSign, User, Package, Search, Trash2, Edit3, 
  X, Upload, Phone, LogOut, AlertCircle, Lock, ShieldCheck, 
  UserPlus, FileText, Check, Shield, Calendar as CalendarIcon, 
  AlertTriangle, Settings, Eye, EyeOff, CheckCircle2, Clock, Download, Database, FileCheck
} from 'lucide-react';

// --- ICONO CUSTOM DE WHATSAPP ---
const WhatsAppIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const STAGES = ['Prospecto', 'Cotizado', 'En Negociación', 'Ganado', 'Perdido'];
const CATEGORIES = ['Equipo', 'Curso', 'Catering'];

const INITIAL_ADMIN = { 
  id: 'admin_001', 
  username: 'hutch96', 
  password: '716142', 
  role: 'Administrador',
  firstName: 'Sebastián',
  lastName: 'Hutchinson'
};

const CONTACT_CHANNELS = [
  'WhatsApp Business',
  'Instagram Direct',
  'Facebook Marketplace',
  'TikTok',
  'Llamada Telefónica',
  'Visita a Local / Showroom',
  'Recomendación / Referido',
  'Web / Landing Page',
  'Otro'
];

export default function OtorongosGrillCRM() {
  useEffect(() => {
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(metaViewport);

    const metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    metaTheme.content = '#f97316';
    document.head.appendChild(metaTheme);

    const metaAppleCapable = document.createElement('meta');
    metaAppleCapable.name = 'apple-mobile-web-app-capable';
    metaAppleCapable.content = 'yes';
    document.head.appendChild(metaAppleCapable);

    const metaAppleStatus = document.createElement('meta');
    metaAppleStatus.name = 'apple-mobile-web-app-status-bar-style';
    metaAppleStatus.content = 'black-translucent';
    document.head.appendChild(metaAppleStatus);
  }, []);

  const [users, setUsers] = useState([INITIAL_ADMIN]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });
  const [authError, setAuthError] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [revealedPasswordUserIds, setRevealedPasswordUserIds] = useState({});
  const [masterPasswordPromptModal, setMasterPasswordPromptModal] = useState(null);
  const [masterPasswordInput, setMasterPasswordInput] = useState('');

  const [userDealsDB, setUserDealsDB] = useState({
    [INITIAL_ADMIN.id]: [
      { 
        id: 1, code: 'SH-2026-0001', client: 'Sebastian Hutchinson', dni: '77679709', birthDate: '1996-02-23',
        phone: '910623817', phone2: '', email: 'sebashut169612@gmail.com', address: 'morropon 181 surco',
        tipoCliente: 'Persona Natural', tipoNegocio: '', nombreNegocio: '', category: 'Equipo', product: 'Parrilla extra grande hibrida', 
        productoComprado: 'Parrilla extra grande hibrida', amount: 5000, advancePayment: 2500, totalPaid: 5000,
        stage: 'Ganado', visitaLocal: false, visitaShowroom: false, saleDate: '2026-11-05',
        paymentMethod: 'Transferencia BCP', bank: 'BCP Corriente Soles', voucherCode: 'VOUCHER-BCP-001293',
        voucherStatus: 'Verificado',
        contactChannel: 'WhatsApp Business',
        voucherImgs: [], productImg: null, quotationFile: null, notes: 'Cliente de parrilla híbrida premium.'
      }
    ]
  });

  const [selectedCommissionUserId, setSelectedCommissionUserId] = useState('');
  const [globalCategoryFilter, setGlobalCategoryFilter] = useState('Todos');

  const activeUserId = useMemo(() => {
    if (!currentUser) return INITIAL_ADMIN.id;
    const isPrivileged = currentUser.role === 'Administrador' || currentUser.role === 'Subadministrador';
    if (isPrivileged && selectedCommissionUserId) {
      if (selectedCommissionUserId === 'todos') return 'todos';
      if (userDealsDB[selectedCommissionUserId]) return selectedCommissionUserId;
    }
    return currentUser.id;
  }, [currentUser, selectedCommissionUserId, userDealsDB]);

  const deals = useMemo(() => {
    let rawDeals = [];
    if (activeUserId === 'todos') {
      rawDeals = Object.entries(userDealsDB).flatMap(([uId, uDeals]) =>
        uDeals.map(d => ({ ...d, _userId: uId }))
      );
    } else {
      rawDeals = (userDealsDB[activeUserId] || []).map(d => ({ ...d, _userId: activeUserId }));
    }

    if (globalCategoryFilter !== 'Todos') {
      rawDeals = rawDeals.filter(d => (d.category || 'Equipo') === globalCategoryFilter);
    }
    return rawDeals;
  }, [activeUserId, userDealsDB, globalCategoryFilter]);

  const updateDealDB = (targetDeal) => {
    const uid = targetDeal._userId || activeUserId;
    const dealToSave = { ...targetDeal };
    delete dealToSave._userId;
    setUserDealsDB(prev => ({ ...prev, [uid]: prev[uid].map(d => d.id === targetDeal.id ? dealToSave : d) }));
  };

  const removeDealDB = (dealId, uid) => {
    setUserDealsDB(prev => ({ ...prev, [uid]: prev[uid].filter(d => d.id !== dealId) }));
  };

  const addDealDB = (newDealObj, uid) => {
    setUserDealsDB(prev => ({ ...prev, [uid]: [...(prev[uid] || []), newDealObj] }));
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState('pipeline'); 
  
  const [selectedUserModal, setSelectedUserModal] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [adminNewUserForm, setAdminNewUserForm] = useState({ firstName: '', lastName: '', username: '', password: '' });

  const [commissionMonth, setCommissionMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [commissionYear, setCommissionYear] = useState(String(new Date().getFullYear()));
  const [appliedFilter, setAppliedFilter] = useState(`${commissionYear}-${commissionMonth}`);

  const getEmptyDeal = () => ({ 
    client: '', dni: '', birthDate: '', phone: '', phone2: '', email: '', address: '', 
    tipoCliente: 'Persona Natural', tipoNegocio: '', nombreNegocio: '', category: 'Equipo', product: '', productoComprado: '', 
    amount: '', advancePayment: '', totalPaid: '', stage: 'Prospecto', visitaLocal: false, visitaShowroom: false, 
    saleDate: new Date().toISOString().split('T')[0], paymentMethod: '', bank: '', voucherCode: '', 
    voucherStatus: 'En revisión', contactChannel: 'WhatsApp Business', notes: '' 
  });
  const [newDeal, setNewDeal] = useState(getEmptyDeal());

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const found = users.find(u => u.username.trim().toLowerCase() === loginForm.username.trim().toLowerCase() && u.password === loginForm.password);
    if (found) {
      setCurrentUser(found);
      setSelectedCommissionUserId(found.id);
      setLoginForm({ username: '', password: '' });
      setView('pipeline');
    } else {
      setAuthError('Usuario o contraseña incorrectos.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!registerForm.firstName.trim() || !registerForm.lastName.trim() || !registerForm.username.trim() || !registerForm.password) {
      return setAuthError('Por favor completa todos los campos (Nombre, Apellido, Usuario y Contraseña).');
    }
    if (registerForm.password !== registerForm.confirmPassword) return setAuthError('Las contraseñas no coinciden.');
    if (users.some(u => u.username.trim().toLowerCase() === registerForm.username.trim().toLowerCase())) return setAuthError('El nombre de usuario ya existe.');

    const newUserId = `user_${Date.now()}`;
    const newUser = { 
      id: newUserId, 
      firstName: registerForm.firstName.trim(),
      lastName: registerForm.lastName.trim(),
      username: registerForm.username.trim(), 
      password: registerForm.password, 
      role: 'Vendedor' 
    };
      
    setUsers([...users, newUser]);
    setUserDealsDB(prev => ({ ...prev, [newUserId]: [] }));
    setCurrentUser(newUser);
    setSelectedCommissionUserId(newUserId);
    setRegisterForm({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });
    setView('pipeline');
  };

  const handleAdminCreateUser = (e) => {
    e.preventDefault();
    if (!adminNewUserForm.firstName.trim() || !adminNewUserForm.lastName.trim() || !adminNewUserForm.username.trim() || !adminNewUserForm.password) {
      return alert('Por favor, completa los campos requeridos (Nombre, Apellido, Usuario y Contraseña).');
    }
    if (users.some(u => u.username.trim().toLowerCase() === adminNewUserForm.username.trim().toLowerCase())) return alert('El nombre de usuario ya existe.');

    const newUserId = `user_${Date.now()}`;
    const newUser = { 
      id: newUserId, 
      firstName: adminNewUserForm.firstName.trim(),
      lastName: adminNewUserForm.lastName.trim(),
      username: adminNewUserForm.username.trim(), 
      password: adminNewUserForm.password, 
      role: 'Vendedor' // Asignación automática por defecto sin selector
    };
      
    setUsers([...users, newUser]);
    setUserDealsDB(prev => ({ ...prev, [newUserId]: [] }));
    setIsAddUserModalOpen(false);
    setAdminNewUserForm({ firstName: '', lastName: '', username: '', password: '' });
  };

  const handleUpdateUserRole = (userId, newRole) => {
    if (userId === INITIAL_ADMIN.id && newRole !== 'Administrador') {
      alert("⚠️ No puedes cambiar el rol del Administrador principal del sistema.");
      return;
    }
    if (newRole === 'Administrador' && currentUser.id !== INITIAL_ADMIN.id) {
      alert("⚠️ Solo el usuario maestro puede asignar el rol de Administrador.");
      return;
    }
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (selectedUserModal && selectedUserModal.user.id === userId) {
      setSelectedUserModal(prev => ({ ...prev, user: { ...prev.user, role: newRole } }));
    }
  };

  const handleDeleteUser = (userId) => {
    if (currentUser.role !== 'Administrador' && currentUser.id !== INITIAL_ADMIN.id) {
      alert("⚠️ Permiso denegado: Solo el Administrador principal puede eliminar usuarios.");
      return;
    }
    if (userId === INITIAL_ADMIN.id) {
      alert("⚠️ Bloqueo: No puedes eliminar al administrador principal del sistema.");
      return;
    }
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario? Se perderán todos sus clientes registrados de forma permanente.")) {
      setUsers(users.filter(u => u.id !== userId));
      const updatedDB = { ...userDealsDB };
      delete updatedDB[userId];
      setUserDealsDB(updatedDB);
      setSelectedUserModal(null);
      setSelectedCommissionUserId(INITIAL_ADMIN.id);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthError('');
    setAuthMode('login');
    setSelectedCommissionUserId('');
  };

  const filteredDeals = useMemo(() => {
    if (!searchTerm.trim()) return deals;
    const term = searchTerm.toLowerCase();
    return deals.filter(d => 
      d.client.toLowerCase().includes(term) || d.dni.toLowerCase().includes(term) || 
      d.code.toLowerCase().includes(term) || d.product.toLowerCase().includes(term)
    );
  }, [deals, searchTerm]);

  const calculateAutoStage = (total, amount, currentStage) => {
    const numTotal = Number(total) || 0;
    const numAmount = Number(amount) || 0;
    if (numAmount > 0 && numTotal >= numAmount) return 'Ganado';
    if (currentStage === 'Ganado' && numTotal < numAmount) return 'En Negociación'; 
    return currentStage;
  };

  const moveDeal = (id, newStage) => {
    const deal = deals.find(d => d.id === id);
    if (!deal) return;
    if (newStage === 'Ganado' && Number(deal.totalPaid) < Number(deal.amount)) {
      alert("⚠️ Bloqueo de Sistema: El Pago Total debe ser igual o mayor al Monto Cotizado para pasar a 'Ganado'.");
      return;
    }
    const updatedDeal = { ...deal, stage: newStage };
    updateDealDB(updatedDeal);
    if (selectedDeal?.id === id) setSelectedDeal(updatedDeal);
  };

  const deleteDeal = (id) => {
    const deal = deals.find(d => d.id === id);
    if (window.confirm("¿Estás seguro de eliminar este registro de cliente? Esta acción no se puede deshacer.")) {
      removeDealDB(id, deal._userId);
      if (selectedDeal?.id === id) setSelectedDeal(null);
    }
  };

  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!newDeal.client || !newDeal.amount) return;
      
    const targetUid = activeUserId === 'todos' ? currentUser.id : activeUserId;
    const userDealsList = userDealsDB[targetUid] || [];
    const count = userDealsList.length + 1;
      
    const activeUserObj = users.find(u => u.id === targetUid) || currentUser;
    const fInit = (activeUserObj.firstName || activeUserObj.username || 'U')[0].toUpperCase();
    const lInit = (activeUserObj.lastName || '')[0] ? activeUserObj.lastName[0].toUpperCase() : '';
    const userPrefix = `${fInit}${lInit}`;
      
    const deal = {
      ...newDeal,
      id: Date.now(),
      code: `${userPrefix}-2026-${String(count).padStart(4, '0')}`,
      amount: parseFloat(newDeal.amount) || 0,
      advancePayment: parseFloat(newDeal.advancePayment) || 0,
      totalPaid: parseFloat(newDeal.totalPaid) || 0,
      voucherStatus: 'En revisión',
      voucherImgs: [],
      productImg: null,
      quotationFile: null
    };

    deal.stage = calculateAutoStage(deal.totalPaid, deal.amount, deal.stage);
    addDealDB(deal, targetUid);
    setIsModalOpen(false);
    setNewDeal(getEmptyDeal());
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const updatedForm = { 
      ...editForm, 
      stage: calculateAutoStage(editForm.totalPaid, editForm.amount, editForm.stage) 
    };
    updateDealDB(updatedForm);
    setSelectedDeal(updatedForm);
    setIsEditing(false);
  };

  const loadXLSX = async () => {
    if (window.XLSX) return window.XLSX;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      script.onload = () => resolve(window.XLSX);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const handleExportExcelDB = async () => {
    try {
      const XLSX = await loadXLSX();
      const wb = XLSX.utils.book_new();
      users.forEach(u => {
        const uDeals = userDealsDB[u.id] || [];
        const exportData = uDeals.map(d => {
          const row = { ...d };
          delete row._userId;
          if (row.voucherImgs) row.voucherImgs = JSON.stringify(row.voucherImgs);
          return row;
        });
        const ws = XLSX.utils.json_to_sheet(exportData.length ? exportData : [{}]);
        XLSX.utils.book_append_sheet(wb, ws, u.username.substring(0, 31));
      });
      XLSX.writeFile(wb, `Backup_OtorongosCRM_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      alert("Error al exportar a Excel: " + err.message);
    }
  };

  const handleImportExcelDB = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const XLSX = await loadXLSX();
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const newDealsDB = { ...userDealsDB };
        
        workbook.SheetNames.forEach(sheetName => {
          const user = users.find(u => u.username.substring(0, 31).toLowerCase() === sheetName.toLowerCase());
          if (user) {
            let roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            roa = roa.map(d => {
              if (typeof d.voucherImgs === 'string') {
                try { d.voucherImgs = JSON.parse(d.voucherImgs); } catch (err) { d.voucherImgs = []; }
              }
              return d;
            });
            roa = roa.filter(d => d.id);
            newDealsDB[user.id] = roa;
          }
        });
        setUserDealsDB(newDealsDB);
        alert("Base de datos actualizada masivamente desde Excel.");
      };
      reader.readAsBinaryString(file);
    } catch (err) {
      alert("Error al importar Excel: " + err.message);
    }
  };

  const handleExportCommissionReportExcel = async () => {
    try {
      const XLSX = await loadXLSX();
      const wb = XLSX.utils.book_new();
      const targetUsers = activeUserId === 'todos' ? users : users.filter(u => u.id === activeUserId);

      targetUsers.forEach(u => {
        let uDeals = userDealsDB[u.id] || [];
        if (globalCategoryFilter !== 'Todos') {
          uDeals = uDeals.filter(d => (d.category || 'Equipo') === globalCategoryFilter);
        }
        const monthlyDeals = uDeals.filter(d => d.saleDate && d.saleDate.startsWith(appliedFilter));
        
        const evaluated = monthlyDeals.map((d) => {
          const isGanado = d.stage === 'Ganado';
          const hasVoucherCode = Boolean(d.voucherCode && d.voucherCode.trim().length > 0);
          const hasVoucherImg = Boolean(d.voucherImgs && d.voucherImgs.length > 0);
          const isVerified = d.voucherStatus === 'Verificado';
          const isEligible = isGanado && hasVoucherCode && hasVoucherImg && isVerified;
          const baseImponible = isEligible ? (d.amount / 1.18) : 0;
          const commissionAmount = isEligible ? (baseImponible * 0.045) : 0;
          return { ...d, isEligible, baseImponible, commissionAmount };
        });

        const eligible = evaluated.filter(d => d.isEligible);
        const totalMonto = eligible.reduce((sum, d) => sum + d.amount, 0);
        const totalBase = eligible.reduce((sum, d) => sum + d.baseImponible, 0);
        const totalCom = eligible.reduce((sum, d) => sum + d.commissionAmount, 0);

        const reportData = evaluated.map((d, index) => ({
          'N°': index + 1,
          'Código': d.code,
          'Cliente': d.client,
          'DNI': d.dni || '-',
          'Categoría': d.category || 'Equipo',
          'Estado Pipeline': d.stage,
          'Producto / Servicio': d.product,
          'Fecha Venta': d.saleDate || '-',
          'Código Voucher': d.voucherCode || 'Pendiente',
          'Estado Voucher': d.voucherStatus || 'En revisión',
          'Monto Bruto (S/)': d.amount,
          'Base Imponible (-18% IGV) (S/)': d.baseImponible,
          'Comisión 4.5% (S/)': d.commissionAmount,
          'Elegible para Comisión': d.isEligible ? 'Sí' : 'No'
        }));

        reportData.push({
          'N°': '',
          'Código': 'TOTALES',
          'Cliente': '',
          'DNI': '',
          'Categoría': '',
          'Estado Pipeline': '',
          'Producto / Servicio': '',
          'Fecha Venta': '',
          'Código Voucher': '',
          'Estado Voucher': '',
          'Monto Bruto (S/)': totalMonto,
          'Base Imponible (-18% IGV) (S/)': totalBase,
          'Comisión 4.5% (S/)': totalCom,
          'Elegible para Comisión': `${eligible.length} válidas`
        });

        const ws = XLSX.utils.json_to_sheet(reportData.length ? reportData : [{}]);
        const sheetName = u.username.substring(0, 31);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      });

      XLSX.writeFile(wb, `Reporte_Comisiones_${commissionYear}_${commissionMonth}_OtorongosGrill.xlsx`);
    } catch (err) {
      alert("Error al exportar reporte de comisiones: " + err.message);
    }
  };

  const handleExportCSV = (deal) => {
    if (!deal) return;
    const headers = [
      'Codigo de Cliente', 'Nombre del Cliente', 'DNI', 'Fecha de Nacimiento', 
      'Correo Electronico', 'Celular 1', 'Celular 2', 'Direccion', 
      'Tipo de Cliente', 'Tipo de Negocio', 'Nombre del Negocio', 'Categoria', 'Canal de Contacto', 
      'Visita al Local', 'Visita al Showroom', 'Producto Cotizado', 'Producto Final Comprado', 
      'Monto Cotizado (S/)', 'Adelanto Pagado (S/)', 'Total Pagado (S/)', 'Deuda Pendiente (S/)', 
      'Estado del Pipeline', 'Fecha de Venta', 'Metodo de Pago', 'Codigo de Voucher', 
      'Estado del Voucher', 'Observaciones / Notas'
    ];

    const deuda = Math.max(0, Number(deal.amount) - Number(deal.totalPaid));

    const row = [
      deal.code, deal.client, deal.dni, deal.birthDate, deal.email, deal.phone, deal.phone2, deal.address,
      deal.tipoCliente, deal.tipoNegocio, deal.nombreNegocio, deal.category || 'Equipo', deal.contactChannel, 
      deal.visitaLocal ? 'Si' : 'No', deal.visitaShowroom ? 'Si' : 'No',
      deal.product, deal.productoComprado, deal.amount, deal.advancePayment, deal.totalPaid, deuda,
      deal.stage, deal.saleDate, deal.paymentMethod, deal.voucherCode, deal.voucherStatus, deal.notes
    ];

    const escapeCSV = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent = [headers.join(','), row.map(escapeCSV).join(',')].join('\n');
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cliente_${deal.code}_${deal.client.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleVoucherStatus = (dealId) => {
    const canChangeStatus = currentUser.role === 'Administrador' || currentUser.role === 'Subadministrador';
    if (!canChangeStatus) {
      alert("⚠️ Solo los Administradores y Subadministradores pueden aprobar o cambiar el estado de verificación de los vouchers.");
      return;
    }
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;
    const newStatus = deal.voucherStatus === 'Verificado' ? 'En revisión' : 'Verificado';
    const updated = { ...deal, voucherStatus: newStatus };
    updateDealDB(updated);
    if (selectedDeal?.id === dealId) setSelectedDeal(updated);
  };

  const handleMultipleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    Promise.all(files.map(file => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    }))).then(base64Images => {
      if (isEditing) {
        setEditForm(prev => ({ ...prev, voucherImgs: [...(prev.voucherImgs || []), ...base64Images] }));
      } else if (selectedDeal) {
        const updated = { ...selectedDeal, voucherImgs: [...(selectedDeal.voucherImgs || []), ...base64Images] };
        setSelectedDeal(updated);
        updateDealDB(updated);
      }
    });
  };

  const removeVoucherImg = (indexToRemove) => {
    if (isEditing) {
      setEditForm(prev => ({ ...prev, voucherImgs: prev.voucherImgs.filter((_, i) => i !== indexToRemove) }));
    } else if (selectedDeal) {
      const updated = { ...selectedDeal, voucherImgs: selectedDeal.voucherImgs.filter((_, i) => i !== indexToRemove) };
      setSelectedDeal(updated);
      updateDealDB(updated);
    }
  };

  const handleSingleImageUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          setEditForm(prev => ({ ...prev, [fieldName]: reader.result }));
        } else if (selectedDeal) {
          const updated = { ...selectedDeal, [fieldName]: reader.result };
          setSelectedDeal(updated);
          updateDealDB(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileObj = { name: file.name, type: file.type, data: reader.result };
        if (isEditing) {
          setEditForm(prev => ({ ...prev, [fieldName]: fileObj }));
        } else if (selectedDeal) {
          const updated = { ...selectedDeal, [fieldName]: fileObj };
          setSelectedDeal(updated);
          updateDealDB(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const metrics = useMemo(() => {
    return {
      totalDeals: deals.length,
      ganado: deals.filter(d => d.stage === 'Ganado').reduce((acc, curr) => acc + curr.amount, 0),
      pipeline: deals.filter(d => ['Prospecto', 'Cotizado', 'En Negociación'].includes(d.stage)).reduce((acc, curr) => acc + curr.amount, 0)
    };
  }, [deals]);

  const commissionAnalysis = useMemo(() => {
    const monthlyDeals = deals.filter(d => d.saleDate && d.saleDate.startsWith(appliedFilter));
    const evaluatedDeals = monthlyDeals.map(d => {
      const isGanado = d.stage === 'Ganado';
      const hasVoucherCode = Boolean(d.voucherCode && d.voucherCode.trim().length > 0);
      const hasVoucherImg = Boolean(d.voucherImgs && d.voucherImgs.length > 0);
      const isVerified = d.voucherStatus === 'Verificado';
      const isEligible = isGanado && hasVoucherCode && hasVoucherImg && isVerified;
        
      const baseImponible = isEligible ? (d.amount / 1.18) : 0;
      const commissionAmount = isEligible ? (baseImponible * 0.045) : 0;

      return { ...d, isGanado, hasVoucherCode, hasVoucherImg, isVerified, isEligible, baseImponible, commissionAmount };
    });

    const eligibleDeals = evaluatedDeals.filter(d => d.isEligible);
    return {
      evaluatedDeals,
      eligibleDealsCount: eligibleDeals.length,
      totalMontoVentas: eligibleDeals.reduce((sum, d) => sum + d.amount, 0),
      totalBaseImponible: eligibleDeals.reduce((sum, d) => sum + d.baseImponible, 0),
      totalComision: eligibleDeals.reduce((sum, d) => sum + d.commissionAmount, 0),
      targetMonth: appliedFilter
    };
  }, [deals, appliedFilter]);

  const formatCurrency = (val) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(val);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-6 sm:p-8 relative z-10">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-600/30 mb-3 border border-orange-500/30 overflow-hidden">
              <img src="/logo.png" alt="Otorongos Grill" className="w-full h-full object-cover" onError={(e)=>{e.target.onerror=null; e.target.src=''; e.target.parentNode.innerHTML='🔥'}} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">OTORONGOS GRILL</h1>
            <p className="text-xs text-orange-400 font-semibold tracking-wider uppercase mt-1">Sistema Comercial & Comisiones</p>
          </div>
          <div className="flex bg-gray-950 p-1 rounded-xl mb-6 border border-gray-800">
            <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); }} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${authMode === 'login' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>Iniciar Sesión</button>
            <button type="button" onClick={() => { setAuthMode('register'); setAuthError(''); }} className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${authMode === 'register' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>Crear Usuario</button>
          </div>
          {authError && (
            <div className="mb-4 bg-red-950/80 border border-red-800 text-red-200 text-xs rounded-xl p-3 flex items-center space-x-2">
              <AlertCircle size={16} className="text-red-400 shrink-0" /><span>{authError}</span>
            </div>
          )}
          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {authMode === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Nombre</label>
                  <input type="text" required value={registerForm.firstName} onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Apellido</label>
                  <input type="text" required value={registerForm.lastName} onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="Tu apellido" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">{authMode === 'login' ? 'Nombre de Usuario' : 'Nuevo Usuario (Login)'}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><User size={16} /></span>
                <input type="text" required value={authMode === 'login' ? loginForm.username : registerForm.username} onChange={(e) => authMode === 'login' ? setLoginForm({ ...loginForm, username: e.target.value }) : setRegisterForm({ ...registerForm, username: e.target.value })} className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="Ingresa tu usuario" autoComplete="off" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Contraseña</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><Lock size={16} /></span>
                <input 
                  type={authMode === 'login' ? (showPassword ? 'text' : 'password') : (showRegisterPassword ? 'text' : 'password')} 
                  required 
                  value={authMode === 'login' ? loginForm.password : registerForm.password} 
                  onChange={(e) => authMode === 'login' ? setLoginForm({ ...loginForm, password: e.target.value }) : setRegisterForm({ ...registerForm, password: e.target.value })} 
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500" 
                  placeholder="••••••••" 
                  autoComplete="current-password" 
                />
                <button 
                  type="button" 
                  onClick={() => authMode === 'login' ? setShowPassword(!showPassword) : setShowRegisterPassword(!showRegisterPassword)} 
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                >
                  {authMode === 'login' ? (showPassword ? <EyeOff size={16} /> : <Eye size={16} />) : (showRegisterPassword ? <EyeOff size={16} /> : <Eye size={16} />)}
                </button>
              </div>
            </div>
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Validar Contraseña</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><ShieldCheck size={16} /></span>
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    required 
                    value={registerForm.confirmPassword} 
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} 
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-orange-500" 
                    placeholder="Escribe de nuevo la contraseña" 
                    autoComplete="new-password" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-orange-600/25 transition-all text-sm mt-2 flex items-center justify-center space-x-2">
              <span>{authMode === 'login' ? 'Acceder al CRM' : 'Crear Usuario e Iniciar'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  const masterUser = users.find(u => u.id === INITIAL_ADMIN.id) || INITIAL_ADMIN;
  const isAdmin = currentUser.role === 'Administrador' || currentUser.id === INITIAL_ADMIN.id;
  const isSubAdmin = currentUser.role === 'Subadministrador';
  const canManageUsers = isAdmin || isSubAdmin;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col">
      <header className="bg-gray-900 border-b border-gray-800 p-4 flex flex-col lg:flex-row items-center justify-between sticky top-0 z-30 gap-4 shadow-xl">
        <div className="flex items-center space-x-3 w-full lg:w-auto justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-600/30 overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e)=>{e.target.onerror=null; e.target.src=''; e.target.parentNode.innerHTML='🔥'}} />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">Otorongos Grill CRM</h1>
              <span className="text-[10px] text-orange-400 font-medium">Gestión Comercial y Comisiones</span>
            </div>
          </div>
          <button type="button" onClick={() => setIsModalOpen(true)} className="lg:hidden bg-orange-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1"><Plus size={14} /><span>Nuevo</span></button>
        </div>

        <div className="flex items-center w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><Search size={16} /></span>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar Nombre, DNI o Código..." className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500" />
          </div>
        </div>
         
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex items-center bg-gray-950 rounded-xl p-1 border border-gray-800 flex-wrap sm:flex-nowrap">
            <button type="button" onClick={() => setView('pipeline')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'pipeline' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>Pipeline</button>
            <button type="button" onClick={() => setView('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'dashboard' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>Dashboard</button>
            <button type="button" onClick={() => setView('commissions')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${view === 'commissions' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}><DollarSign size={14} /><span>Comisiones</span></button>
            {canManageUsers && <button type="button" onClick={() => setView('admin_users')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${view === 'admin_users' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}><Shield size={14} /><span>Usuarios</span></button>}
            {isAdmin && <button type="button" onClick={() => setView('backup')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${view === 'backup' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}><Database size={14} /><span>Respaldo</span></button>}
          </div>
          <button type="button" onClick={() => setIsModalOpen(true)} className="hidden lg:flex bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-2 rounded-xl font-medium items-center space-x-1.5 text-xs shadow-lg shadow-orange-600/20"><Plus size={16} /><span>Nuevo Trato</span></button>
          <div className="flex items-center space-x-2 border-l border-gray-800 pl-3">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-semibold text-white">{currentUser.username}</span>
              <span className="block text-[10px] text-orange-400">{currentUser.role}</span>
            </div>
            <button type="button" onClick={handleLogout} title="Cerrar Sesión" className="p-2 text-gray-400 hover:text-red-400 bg-gray-950 rounded-xl border border-gray-800 transition-colors"><LogOut size={16} /></button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6">
        {view === 'backup' && isAdmin && (
          <div className="flex-1 overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center"><Database className="text-orange-500 mr-2" /> Respaldo de Datos (Backup en Excel)</h2>
              <p className="text-sm text-gray-400 mt-2">Descarga toda la base de datos en un archivo Excel. Cada usuario tendrá su propia pestaña con la información de sus clientes. Puedes importar un archivo con el mismo formato para actualizar masivamente la base de datos.</p>
            </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center text-center space-y-4 shadow-lg">
                <div className="w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <Download size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Descargar Base de Datos</h3>
                  <p className="text-xs text-gray-400 mt-1">Exporta toda la información en un documento de múltiples pestañas.</p>
                </div>
                <button onClick={handleExportExcelDB} className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-green-900/50 flex items-center space-x-2">
                  <Database size={18} /><span>Exportar a Excel</span>
                </button>
              </div>

              <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 flex flex-col items-center justify-center text-center space-y-4 shadow-lg">
                <div className="w-16 h-16 bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-2">
                  <Upload size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Importar Base de Datos</h3>
                  <p className="text-xs text-gray-400 mt-1">Sube un archivo Excel para actualizar toda la base de clientes y usuarios.</p>
                </div>
                <label className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/50 flex items-center space-x-2 cursor-pointer">
                  <Upload size={18} /><span>Subir Archivo Excel</span>
                  <input type="file" accept=".xlsx, .xls" onChange={handleImportExcelDB} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}

        {view === 'admin_users' && canManageUsers && (
          <div className="flex-1 overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-4 gap-4">
              <h2 className="text-xl font-bold text-white flex items-center"><Shield className="text-orange-500 mr-2" /> Administración de Usuarios</h2>
              <button type="button" onClick={() => setIsAddUserModalOpen(true)} className="bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1 shadow-lg shadow-orange-600/20"><UserPlus size={14} /><span>Nuevo Usuario</span></button>
            </div>
            <div className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-gray-800/80 text-gray-400 text-xs uppercase font-mono border-b border-gray-800">
                  <tr><th className="p-4">Usuario</th><th className="p-4">Nombres</th><th className="p-4">Rol</th><th className="p-4">Cartera de Clientes</th><th className="p-4">Estado</th><th className="p-4 text-center">Configuración</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {users.map(u => {
                    const uDeals = userDealsDB[u.id] || [];
                    return (
                      <tr key={u.id} className="hover:bg-gray-900/60 transition-colors">
                        <td className="p-4 font-bold text-white">{u.username}</td>
                        <td className="p-4 text-gray-300">{u.firstName || ''} {u.lastName || ''}</td>
                        <td className="p-4 text-xs font-mono text-orange-400">{u.role}</td>
                        <td className="p-4 font-semibold">{uDeals.length} clientes registrados</td>
                        <td className="p-4"><span className="text-green-400 text-xs font-bold bg-green-950 px-2 py-1 rounded border border-green-800">Activo</span></td>
                        <td className="p-4 text-center">
                          <button type="button" onClick={() => {
                            const uGanadas = uDeals.filter(d => d.stage === 'Ganado').reduce((sum, d) => sum + d.amount, 0);
                            const uPipeline = uDeals.filter(d => ['Prospecto', 'Cotizado', 'En Negociación'].includes(d.stage)).reduce((sum, d) => sum + d.amount, 0);
                            setSelectedUserModal({ user: u, deals: uDeals, ganadas: uGanadas, pipeline: uPipeline });
                          }} className="p-2 bg-gray-900 hover:bg-gray-800 text-orange-400 rounded-xl border border-gray-800 transition-colors inline-flex items-center justify-center">
                            <Settings size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'pipeline' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="mb-4 bg-gray-900 p-3 rounded-xl border border-gray-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center space-x-2">
                {canManageUsers && (
                  <>
                    <span className="text-xs text-gray-400 font-semibold">Cartera del usuario:</span>
                    <select value={activeUserId} onChange={(e) => setSelectedCommissionUserId(e.target.value)} className="bg-gray-950 border border-gray-800 text-xs text-orange-400 font-bold rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                      {isAdmin && <option value="todos">Todos (Consolidado)</option>}
                      {users.map(u => <option key={u.id} value={u.id}>{u.username} ({u.role})</option>)}
                    </select>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-semibold">Filtro de Categoría:</span>
                <select value={globalCategoryFilter} onChange={(e) => setGlobalCategoryFilter(e.target.value)} className="bg-gray-950 border border-gray-800 text-orange-400 text-xs font-bold rounded-xl px-3 py-1.5 outline-none cursor-pointer shrink-0">
                  <option value="Todos">Todas las Categorías</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 shrink-0">
              <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
                <span className="text-gray-400 text-xs block mb-1">Pipeline Activo</span>
                <span className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(metrics.pipeline)}</span>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
                <span className="text-gray-400 text-xs block mb-1">Ventas Ganadas Total</span>
                <span className="text-xl sm:text-2xl font-bold text-green-400">{formatCurrency(metrics.ganado)}</span>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 col-span-2 md:col-span-1">
                <span className="text-gray-400 text-xs block mb-1">Clientes Filtrados</span>
                <span className="text-xl sm:text-2xl font-bold text-orange-400">{filteredDeals.length} de {deals.length}</span>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max h-full">
                {STAGES.map((stage) => {
                  const stageDeals = filteredDeals.filter(d => d.stage === stage);
                  const stageValue = stageDeals.reduce((sum, d) => sum + d.amount, 0);
                  const topBorder = stage === 'Ganado' ? 'border-green-500' : stage === 'Perdido' ? 'border-red-500' : stage === 'En Negociación' ? 'border-yellow-500' : 'border-blue-500';

                  return (
                    <div key={stage} className={`w-80 flex flex-col bg-gray-900/60 rounded-2xl border-t-4 ${topBorder} border-x border-b border-gray-800`}>
                      <div className="p-3.5 flex justify-between items-center border-b border-gray-800">
                        <h3 className="font-semibold text-gray-200 uppercase text-xs tracking-wider">{stage}</h3>
                        <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full font-mono">{stageDeals.length}</span>
                      </div>
                      <div className="px-3.5 py-2 text-xs font-semibold text-orange-400 bg-gray-950/40">{formatCurrency(stageValue)}</div>
                      <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {stageDeals.map((deal) => {
                          const isFullyPaid = Number(deal.totalPaid) >= Number(deal.amount) && Number(deal.amount) > 0;
                          return (
                            <div key={deal.id} onClick={() => { setSelectedDeal(deal); setIsEditing(false); }} className="bg-gray-900 border border-gray-800 p-3.5 rounded-xl shadow-md hover:border-orange-500 transition-all cursor-pointer group">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-1">
                                  <span className="text-[10px] bg-gray-950 text-orange-400 font-mono px-2 py-0.5 rounded-md border border-orange-500/20">{deal.code}</span>
                                  <span className="text-[10px] bg-gray-800 text-gray-300 font-medium px-2 py-0.5 rounded-md">{deal.category || 'Equipo'}</span>
                                </div>
                                {isFullyPaid && <span className="text-[10px] bg-green-950/50 text-green-400 px-2 py-0.5 rounded border border-green-800 flex items-center space-x-1"><Check size={10}/><span>Pagado</span></span>}
                              </div>
                              <h4 className="font-bold text-white text-sm mb-1 group-hover:text-orange-300 transition-colors">{deal.client}</h4>
                              <div className="text-xs text-gray-400 mb-2 truncate">{deal.product}</div>
                              <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                                <span className="text-sm font-extrabold text-orange-400">{formatCurrency(deal.amount)}</span>
                                <select 
                                  value={deal.stage} onClick={(e) => e.stopPropagation()} onChange={(e) => moveDeal(deal.id, e.target.value)} 
                                  disabled={isFullyPaid && deal.stage === 'Ganado'} 
                                  className={`bg-gray-950 border border-gray-800 text-[11px] rounded-lg px-2 py-1 outline-none cursor-pointer ${deal.stage === 'Ganado' ? 'text-green-400 font-bold' : 'text-gray-300'} disabled:opacity-70 disabled:cursor-not-allowed`}
                                >
                                  {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="flex-1 overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-800 pb-4 gap-4">
              <h2 className="text-xl font-bold text-white">Análisis de Pipeline & Ventas</h2>
              <div className="flex flex-wrap items-center gap-3">
                {canManageUsers && (
                  <div className="flex items-center space-x-2 bg-gray-950 p-1.5 rounded-xl border border-gray-800">
                    <span className="text-xs text-gray-400 pl-2">Usuario:</span>
                    <select value={activeUserId} onChange={(e) => setSelectedCommissionUserId(e.target.value)} className="bg-transparent border-none text-orange-400 text-xs font-bold px-2 py-1 outline-none cursor-pointer">
                      {isAdmin && <option value="todos">Todos (Consolidado)</option>}
                      {users.map(u => <option key={u.id} value={u.id}>{u.username} ({u.role})</option>)}
                    </select>
                  </div>
                )}
                <div className="flex items-center space-x-2 bg-gray-950 p-1.5 rounded-xl border border-gray-800">
                  <span className="text-xs text-gray-400 pl-2">Categoría:</span>
                  <select value={globalCategoryFilter} onChange={(e) => setGlobalCategoryFilter(e.target.value)} className="bg-transparent border-none text-orange-400 text-xs font-bold px-2 py-1 outline-none cursor-pointer">
                    <option value="Todos">Todas las Categorías</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-4">
                <h3 className="text-sm font-semibold text-gray-300">Resumen por Estado Comercial</h3>
                {STAGES.map(stage => (
                  <div key={stage} className="flex items-center justify-between bg-gray-900 p-3 rounded-xl border border-gray-800">
                    <div><span className="text-sm font-semibold text-white block">{stage}</span><span className="text-xs text-gray-400">{deals.filter(d => d.stage === stage).length} registro(s)</span></div>
                    <span className="text-orange-400 font-bold">{formatCurrency(deals.filter(d => d.stage === stage).reduce((sum, d) => sum + d.amount, 0))}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-950 p-5 rounded-xl border border-gray-800 space-y-4">
                <h3 className="text-sm font-semibold text-gray-300">Equipos & Servicios Cotizados</h3>
                <div className="space-y-3">
                  {Array.from(new Set(deals.map(d => d.product))).map(prod => (
                    <div key={prod} className="flex justify-between items-center p-3 bg-gray-900 rounded-xl border border-gray-800">
                      <span className="text-xs font-medium text-gray-200">{prod}</span>
                      <span className="text-xs font-bold text-green-400">{formatCurrency(deals.filter(d => d.product === prod).reduce((sum, d) => sum + d.amount, 0))}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'commissions' && (
          <div className="flex-1 overflow-y-auto bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-gray-800 pb-4 gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center"><DollarSign className="text-orange-500 mr-1.5" /> Liquidación & Cálculo de Comisiones</h2>
                <p className="text-xs text-gray-400 mt-0.5">Requisitos (4.5% neto): Estado <strong className="text-green-400">Ganado</strong> + <strong className="text-gray-200">Fecha del mes</strong> + <strong className="text-gray-200">Código Voucher</strong> + <strong className="text-gray-200">Foto Pago</strong> + <strong className="text-gray-200">Voucher Verificado (Admin/Subadmin)</strong>.</p>
              </div>
                
              <div className="flex flex-wrap items-center gap-3">
                {canManageUsers && (
                  <div className="flex flex-col space-y-1">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Seleccionar Vendedor</label>
                    <select value={activeUserId} onChange={(e) => setSelectedCommissionUserId(e.target.value)} className="bg-gray-950 border border-gray-800 text-orange-400 text-xs font-bold rounded-xl px-3 py-2.5 outline-none cursor-pointer">
                      {isAdmin && <option value="todos">Todos (Consolidado)</option>}
                      {users.map(u => <option key={u.id} value={u.id}>{u.username} ({u.role})</option>)}
                    </select>
                  </div>
                )}
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Categoría</label>
                  <select value={globalCategoryFilter} onChange={(e) => setGlobalCategoryFilter(e.target.value)} className="bg-gray-950 border border-gray-800 text-orange-400 text-xs font-bold rounded-xl px-3 py-2.5 outline-none cursor-pointer">
                    <option value="Todos">Todas las Categorías</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider pl-1">Filtrar por Mes y Año</label>
                  <div className="flex items-center space-x-2 bg-gray-950 p-1.5 rounded-xl border border-gray-800 focus-within:border-orange-500 transition-colors">
                    <CalendarIcon size={16} className="text-orange-500 ml-2" />
                    <select value={commissionMonth} onChange={(e) => setCommissionMonth(e.target.value)} className="bg-transparent border-none text-white text-sm px-1 py-1.5 font-bold outline-none cursor-pointer">
                      {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => <option key={m} value={m}>{new Date(0, m-1).toLocaleString('es', { month: 'long' }).toUpperCase()}</option>)}
                    </select>
                    <span className="text-gray-600 font-bold">/</span>
                    <select value={commissionYear} onChange={(e) => setCommissionYear(e.target.value)} className="bg-transparent border-none text-white text-sm px-1 py-1.5 font-bold outline-none cursor-pointer">
                      {['2024','2025','2026','2027'].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <button type="button" onClick={() => setAppliedFilter(`${commissionYear}-${commissionMonth}`)} className="bg-orange-600 hover:bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold ml-2 transition-colors cursor-pointer">Filtrar</button>
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <button type="button" onClick={handleExportCommissionReportExcel} className="bg-green-600 hover:bg-green-500 text-white text-xs px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1.5 shadow-lg shadow-green-900/40 transition-all cursor-pointer mt-5">
                    <Download size={16} /><span>Exportar Reporte Excel</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                <span className="text-xs text-gray-400 block mb-1">Ventas Calificadas (Monto Bruto)</span>
                <span className="text-2xl font-extrabold text-white">{formatCurrency(commissionAnalysis.totalMontoVentas)}</span>
                <span className="text-[10px] text-gray-500 block mt-1">{commissionAnalysis.eligibleDealsCount} venta(s) validadas</span>
              </div>
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                <span className="text-xs text-gray-400 block mb-1">Base Imponible (Menos 18% IGV)</span>
                <span className="text-2xl font-extrabold text-amber-400">{formatCurrency(commissionAnalysis.totalBaseImponible)}</span>
                <span className="text-[10px] text-gray-500 block mt-1">Monto Bruto / 1.18</span>
              </div>
              <div className="bg-gradient-to-br from-orange-950 to-gray-950 p-4 rounded-xl border border-orange-500/40">
                <span className="text-xs text-orange-400 font-semibold block mb-1">Comisión a Cobrar (4.5%)</span>
                <span className="text-3xl font-black text-green-400">{formatCurrency(commissionAnalysis.totalComision)}</span>
                <span className="text-[10px] text-gray-400 block mt-1">4.5% de la Base Imponible</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300">Detalle de Transacciones del Mes</h3>
              {commissionAnalysis.evaluatedDeals.length === 0 ? (
                <div className="bg-gray-950 p-8 rounded-xl border border-gray-800 text-center text-gray-500 text-xs">No hay ventas registradas con fecha en el mes seleccionado.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300 bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
                    <thead className="bg-gray-800/80 text-gray-400 text-[11px] uppercase font-mono border-b border-gray-800">
                      <tr>
                        <th className="p-3">Código / Cliente</th><th className="p-3">Categoría</th><th className="p-3">Estado</th><th className="p-3">Vouchers & Estado</th>
                        <th className="p-3 text-right">Monto Bruto</th><th className="p-3 text-right">Base (-18%)</th>
                        <th className="p-3 text-right text-orange-400">Comisión (4.5%)</th><th className="p-3 text-center">Elegibilidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {commissionAnalysis.evaluatedDeals.map(d => (
                        <tr key={d.id} className="hover:bg-gray-900/60 transition-colors">
                          <td className="p-3">
                            <span className="font-mono text-orange-400 block font-semibold">{d.code}</span>
                            <span className="font-bold text-white">{d.client}</span>
                          </td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-800 text-orange-300">{d.category || 'Equipo'}</span></td>
                          <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.isGanado ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-400'}`}>{d.stage}</span></td>
                          <td className="p-3 space-y-1">
                            <div className="flex items-center space-x-1"><span className="text-[10px] text-gray-400">Cód:</span><span className={`font-mono text-[10px] ${d.hasVoucherCode ? 'text-gray-200' : 'text-red-400 font-bold'}`}>{d.voucherCode || 'Falta código'}</span></div>
                            <div className="flex items-center space-x-1"><span className="text-[10px] text-gray-400">Fotos:</span><span className={`text-[10px] ${d.hasVoucherImg ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}`}>{d.hasVoucherImg ? `${d.voucherImgs.length} adjunta(s)` : '✗ Sin Foto'}</span></div>
                            <div className="flex items-center space-x-1 pt-0.5">
                              <span className="text-[10px] text-gray-400">Estado:</span>
                              <button 
                                type="button" 
                                onClick={() => handleToggleVoucherStatus(d.id)} 
                                title={canManageUsers ? "Click para cambiar estado" : "Solo Admin/Subadmin pueden verificar"}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center space-x-1 cursor-pointer ${d.voucherStatus === 'Verificado' ? 'bg-green-950 text-green-400 border border-green-700' : 'bg-yellow-950/70 text-yellow-400 border border-yellow-800'}`}
                              >
                                {d.voucherStatus === 'Verificado' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                                <span>{d.voucherStatus || 'En revisión'}</span>
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-right font-bold text-white">{formatCurrency(d.amount)}</td>
                          <td className="p-3 text-right font-mono">{formatCurrency(d.baseImponible)}</td>
                          <td className="p-3 text-right font-bold text-green-400 font-mono text-sm">{formatCurrency(d.commissionAmount)}</td>
                          <td className="p-3 text-center">
                            {d.isEligible ? <span className="inline-flex items-center px-2 py-1 bg-green-950 border border-green-700 text-green-400 rounded-lg text-[10px] font-bold"><Check size={12} className="mr-1" /> VÁLIDA</span> : <span className="inline-flex items-center px-2 py-1 bg-red-950/60 border border-red-800 text-red-400 rounded-lg text-[10px]"><AlertCircle size={12} className="mr-1" /> PENDIENTE</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {isAddUserModalOpen && canManageUsers && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-800 overflow-hidden flex flex-col">
            <div className="bg-gray-950 p-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <UserPlus size={18} className="text-orange-500" />
                <h3 className="text-sm font-bold text-white">Crear Nuevo Usuario</h3>
              </div>
              <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleAdminCreateUser} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Nombre</label>
                  <input type="text" required value={adminNewUserForm.firstName} onChange={e => setAdminNewUserForm({...adminNewUserForm, firstName: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500" placeholder="Nombre" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Apellido</label>
                  <input type="text" required value={adminNewUserForm.lastName} onChange={e => setAdminNewUserForm({...adminNewUserForm, lastName: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500" placeholder="Apellido" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Nombre de Usuario</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><User size={16} /></span>
                  <input type="text" required value={adminNewUserForm.username} onChange={e => setAdminNewUserForm({...adminNewUserForm, username: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500" placeholder="Nombre de acceso" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Contraseña</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"><Lock size={16} /></span>
                  <input 
                    type={showAdminPassword ? 'text' : 'password'} 
                    required 
                    value={adminNewUserForm.password} 
                    onChange={e => setAdminNewUserForm({...adminNewUserForm, password: e.target.value})} 
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-10 py-2 text-sm text-white focus:outline-none focus:border-orange-500" 
                    placeholder="••••••••" 
                    autoComplete="new-password"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowAdminPassword(!showAdminPassword)} 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  >
                    {showAdminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 text-gray-400 text-xs hover:text-white cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-orange-600/20 cursor-pointer">Guardar Usuario</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedUserModal && canManageUsers && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800 overflow-hidden flex flex-col">
            <div className="bg-gray-950 p-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings size={18} className="text-orange-500" />
                <h3 className="text-sm font-bold text-white">Configuración: {selectedUserModal.user.username}</h3>
              </div>
              <button type="button" onClick={() => setSelectedUserModal(null)} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block mb-1">Credenciales de Acceso</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Usuario:</span>
                  <span className="font-mono font-bold text-white">{selectedUserModal.user.username}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Contraseña:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-amber-400">
                      {selectedUserModal.user.id === INITIAL_ADMIN.id 
                        ? '********' 
                        : (revealedPasswordUserIds[selectedUserModal.user.id] ? selectedUserModal.user.password : '********')}
                    </span>
                    {selectedUserModal.user.id !== INITIAL_ADMIN.id && (
                      <button 
                        type="button" 
                        onClick={() => {
                          if (revealedPasswordUserIds[selectedUserModal.user.id]) {
                            setRevealedPasswordUserIds(prev => ({ ...prev, [selectedUserModal.user.id]: false }));
                          } else {
                            setMasterPasswordPromptModal({
                              userId: selectedUserModal.user.id,
                              callback: () => {
                                setRevealedPasswordUserIds(prev => ({ ...prev, [selectedUserModal.user.id]: true }));
                                setMasterPasswordPromptModal(null);
                                setMasterPasswordInput('');
                              }
                            });
                          }
                        }}
                        className="text-gray-400 hover:text-white p-1"
                      >
                        {revealedPasswordUserIds[selectedUserModal.user.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Rol del Sistema:</span>
                  {isAdmin && selectedUserModal.user.id !== INITIAL_ADMIN.id ? (
                    <select 
                      value={selectedUserModal.user.role} 
                      onChange={(e) => handleUpdateUserRole(selectedUserModal.user.id, e.target.value)}
                      className="bg-gray-900 border border-gray-700 text-orange-300 text-xs font-mono rounded px-2 py-1 outline-none cursor-pointer"
                    >
                      <option value="Vendedor">Vendedor</option>
                      <option value="Subadministrador">Subadministrador</option>
                      {currentUser.id === INITIAL_ADMIN.id && <option value="Administrador">Administrador</option>}
                    </select>
                  ) : (
                    <span className="font-mono text-orange-300">{selectedUserModal.user.role}</span>
                  )}
                </div>
              </div>

              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block">Estadísticas de Ventas</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Total Clientes Cartera:</span>
                  <span className="font-bold text-white">{selectedUserModal.deals.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Pipeline Activo:</span>
                  <span className="font-bold text-blue-400">{formatCurrency(selectedUserModal.pipeline)}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Ventas Cerradas (Ganadas):</span>
                  <span className="font-bold text-green-400">{formatCurrency(selectedUserModal.ganadas)}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-950 p-4 border-t border-gray-800 flex justify-between items-center">
              {isAdmin && selectedUserModal.user.id !== INITIAL_ADMIN.id ? (
                <button type="button" onClick={() => handleDeleteUser(selectedUserModal.user.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center space-x-1 transition-colors cursor-pointer"><Trash2 size={14} /><span>Eliminar Usuario</span></button>
              ) : <div></div>}
              <button type="button" onClick={() => setSelectedUserModal(null)} className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {masterPasswordPromptModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl border border-gray-800 p-6 space-y-4">
            <div className="flex items-center space-x-2 text-orange-400 font-bold text-sm">
              <Lock size={18} />
              <span>Autenticación de Usuario Maestro</span>
            </div>
            <p className="text-xs text-gray-300">Para ver las credenciales de acceso, ingresa la contraseña del usuario maestro ({masterUser.username}):</p>
            <input 
              type="password" 
              value={masterPasswordInput} 
              onChange={(e) => setMasterPasswordInput(e.target.value)} 
              placeholder="Contraseña del Maestro"
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
              autoFocus
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button 
                type="button" 
                onClick={() => { setMasterPasswordPromptModal(null); setMasterPasswordInput(''); }}
                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                onClick={() => {
                  if (masterPasswordInput === masterUser.password) {
                    masterPasswordPromptModal.callback();
                  } else {
                    alert("❌ Contraseña de usuario maestro incorrecta.");
                  }
                }}
                className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDeal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-900 rounded-2xl w-full max-w-3xl shadow-2xl border border-gray-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gray-950 p-4 border-b border-gray-800 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-3">
                <span className="bg-orange-600 text-white font-mono text-xs px-2.5 py-1 rounded-md font-bold">{selectedDeal.code}</span>
                <h2 className="text-lg font-bold text-white">{selectedDeal.client}</h2>
                <span className="bg-gray-800 text-orange-300 text-xs px-2.5 py-1 rounded-md font-semibold">{selectedDeal.category || 'Equipo'}</span>
                {Number(selectedDeal.totalPaid) >= Number(selectedDeal.amount) && Number(selectedDeal.amount) > 0 && (
                  <span className="bg-green-950/80 text-green-400 text-[10px] font-bold px-2 py-1 rounded border border-green-800 flex items-center space-x-1"><Check size={12} /><span>100% CANCELADO</span></span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing && (
                  <>
                    <button type="button" onClick={() => handleExportCSV(selectedDeal)} className="bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors">
                      <Download size={14} /><span>Exportar CSV</span>
                    </button>
                    <button type="button" onClick={() => { setIsEditing(true); setEditForm({ ...selectedDeal }); }} className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 cursor-pointer">
                      <Edit3 size={14} /><span>Editar Ficha</span>
                    </button>
                  </>
                )}
                <button type="button" onClick={() => setSelectedDeal(null)} className="text-gray-400 hover:text-white p-1 cursor-pointer"><X size={20} /></button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {!isEditing ? (
                <>
                  <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Datos Personales y Contacto</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div><span className="text-xs text-gray-500 block">DNI</span><span className="text-sm font-semibold">{selectedDeal.dni || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">F. Nacimiento</span><span className="text-sm font-semibold">{selectedDeal.birthDate || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Correo Electrónico</span><span className="text-sm font-semibold">{selectedDeal.email || '-'}</span></div>
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Celular Principal</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-white">{selectedDeal.phone || '-'}</span>
                          {selectedDeal.phone && (
                            <div className="flex items-center space-x-1">
                              <a href={`tel:${selectedDeal.phone}`} className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg text-xs transition-colors"><Phone size={12} /></a>
                              <a href={`https://wa.me/51${selectedDeal.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#1EBE55] text-white p-1.5 rounded-lg text-xs flex items-center justify-center transition-colors shadow-lg shadow-[#25D366]/20">
                                <WhatsAppIcon size={14} />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <div><span className="text-xs text-gray-500 block">Celular Secundario</span><span className="text-sm font-semibold text-white">{selectedDeal.phone2 || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Dirección</span><span className="text-sm font-semibold">{selectedDeal.address || '-'}</span></div>
                    </div>
                  </div>

                  <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Clasificación y Seguimiento</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div><span className="text-xs text-gray-500 block">Tipo Cliente</span><span className="text-sm font-semibold text-white">{selectedDeal.tipoCliente}</span></div>
                      <div><span className="text-xs text-gray-500 block">Tipo Negocio</span><span className="text-sm font-semibold text-white">{selectedDeal.tipoNegocio || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Nombre Negocio</span><span className="text-sm font-semibold text-white">{selectedDeal.nombreNegocio || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Categoría de Venta</span><span className="text-sm font-bold text-orange-400">{selectedDeal.category || 'Equipo'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Canal de Contacto</span><span className="text-sm font-semibold text-orange-300">{selectedDeal.contactChannel || 'WhatsApp Business'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Visita a Local / Showroom</span><span className="text-sm font-semibold">{selectedDeal.visitaLocal ? 'Local Sí ' : ''}{selectedDeal.visitaShowroom ? 'Showroom Sí' : (!selectedDeal.visitaLocal && !selectedDeal.visitaShowroom ? 'No' : '')}</span></div>
                      <div className="sm:col-span-3"><span className="text-xs text-gray-500 block">Observaciones</span><span className="text-sm font-semibold">{selectedDeal.notes || '-'}</span></div>
                    </div>
                  </div>

                  <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Producto y Estado de Pagos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                      <div className="col-span-1 sm:col-span-2"><span className="text-xs text-gray-500 block">Producto Cotizado</span><span className="text-sm font-bold text-gray-300">{selectedDeal.product}</span></div>
                      <div className="col-span-1 sm:col-span-2"><span className="text-xs text-gray-500 block">Producto Comprado (Final)</span><span className="text-sm font-bold text-white">{selectedDeal.productoComprado || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Monto Cotizado</span><span className="text-lg font-bold text-white">{formatCurrency(selectedDeal.amount)}</span></div>
                      <div><span className="text-xs text-gray-500 block">Adelanto / Separación</span><span className="text-lg font-bold text-blue-400">{formatCurrency(selectedDeal.advancePayment)}</span></div>
                      <div><span className="text-xs text-gray-500 block">Total Pagado</span><span className="text-lg font-bold text-green-400">{formatCurrency(selectedDeal.totalPaid)}</span></div>
                      <div>
                        <span className="text-xs text-gray-500 block">Deuda Pendiente</span>
                        <span className={`text-lg font-bold ${Number(selectedDeal.amount) - Number(selectedDeal.totalPaid) <= 0 ? 'text-gray-500' : 'text-red-400'}`}>{formatCurrency(Math.max(0, Number(selectedDeal.amount) - Number(selectedDeal.totalPaid)))}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div><span className="text-xs text-gray-500 block">Fecha de Venta</span><span className="text-sm font-mono font-bold text-green-400">{selectedDeal.saleDate || '-'}</span></div>
                      <div><span className="text-xs text-gray-500 block">Método / Banco</span><span className="text-sm font-medium">{selectedDeal.paymentMethod} {selectedDeal.bank ? `(${selectedDeal.bank})` : ''}</span></div>
                      <div>
                        <span className="text-xs text-gray-500 block">Código de Voucher & Estado</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-mono font-bold text-white">{selectedDeal.voucherCode || 'Pendiente'}</span>
                          <button 
                            type="button" 
                            onClick={() => handleToggleVoucherStatus(selectedDeal.id)} 
                            className={`px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center space-x-1 cursor-pointer ${selectedDeal.voucherStatus === 'Verificado' ? 'bg-green-950 text-green-400 border border-green-700' : 'bg-yellow-950/70 text-yellow-400 border border-yellow-800'}`}
                          >
                            {selectedDeal.voucherStatus === 'Verificado' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                            <span>{selectedDeal.voucherStatus || 'En revisión'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex flex-col">
                      <span className="text-xs font-semibold text-gray-300 mb-2 flex items-center justify-between">
                        <span className="flex items-center"><FileText size={14} className="mr-1 text-orange-500" /> Vouchers</span>
                        <label className="bg-gray-800 hover:bg-gray-700 text-white text-[10px] px-2 py-1 rounded cursor-pointer font-semibold transition-colors flex items-center space-x-1"><Plus size={12} /><span>Agregar</span><input type="file" accept="image/*" multiple onChange={handleMultipleImagesUpload} className="hidden" /></label>
                      </span>
                      {(!selectedDeal.voucherImgs || selectedDeal.voucherImgs.length === 0) ? (
                        <div className="w-full h-24 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs">Sin vouchers</div>
                      ) : (
                        <div className="flex gap-2 overflow-x-auto py-2 pb-3 scrollbar-thin">
                          {selectedDeal.voucherImgs.map((img, idx) => (
                            <div key={idx} className="relative shrink-0 group">
                              <img src={img} alt={`Voucher ${idx+1}`} className="h-24 w-20 object-cover bg-black rounded-lg border border-gray-700" />
                              <button type="button" onClick={() => removeVoucherImg(idx)} className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"><X size={12} /></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-300 mb-2 flex items-center w-full"><Package size={14} className="mr-1 text-orange-500" /> Foto del Producto</span>
                      {selectedDeal.productImg ? (
                        <div className="relative w-full group">
                           <img src={selectedDeal.productImg} alt="Parrilla" className="w-full h-24 object-contain bg-black rounded-lg mb-2 border border-gray-800" />
                           <button type="button" onClick={() => { const d = {...selectedDeal, productImg: null}; setSelectedDeal(d); updateDealDB(d); }} className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><Trash2 size={12}/></button>
                        </div>
                      ) : (
                        <div className="w-full h-24 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs mb-2">Sin foto</div>
                      )}
                      <label className="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 rounded-lg cursor-pointer text-center font-semibold transition-colors flex items-center justify-center space-x-1 mt-auto"><Upload size={14} /><span>Subir Foto</span><input type="file" accept="image/*" onChange={(e) => handleSingleImageUpload(e, 'productImg')} className="hidden" /></label>
                    </div>

                    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex flex-col items-center">
                      <span className="text-xs font-semibold text-gray-300 mb-2 flex items-center w-full"><FileCheck size={14} className="mr-1 text-orange-500" /> Cotización (PDF / Img)</span>
                      {selectedDeal.quotationFile ? (
                        <div className="relative w-full bg-gray-900 p-3 rounded-lg border border-gray-800 mb-2 flex flex-col items-center justify-center h-24">
                          <FileText size={24} className="text-orange-400 mb-1" />
                          <span className="text-[10px] text-gray-300 truncate w-full text-center px-2">{selectedDeal.quotationFile.name}</span>
                          <div className="flex space-x-2 mt-1">
                            <a href={selectedDeal.quotationFile.data} download={selectedDeal.quotationFile.name} className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-2 py-0.5 rounded">Descargar</a>
                            <button type="button" onClick={() => { const d = {...selectedDeal, quotationFile: null}; setSelectedDeal(d); updateDealDB(d); }} className="text-[10px] bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded">Eliminar</button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-24 border-2 border-dashed border-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs mb-2 text-center px-2">Sin cotización adjunta</div>
                      )}
                      <label className="w-full bg-gray-800 hover:bg-gray-700 text-white text-xs py-2 rounded-lg cursor-pointer text-center font-semibold transition-colors flex items-center justify-center space-x-1 mt-auto">
                        <Upload size={14} /><span>Subir Cotización</span>
                        <input type="file" accept=".pdf, image/*" onChange={(e) => handleFileUpload(e, 'quotationFile')} className="hidden" />
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={saveEdit} className="space-y-4">
                  <div className="bg-orange-950/30 border border-orange-500/30 p-3 rounded-xl mb-4">
                    <span className="text-xs text-orange-300 flex items-start space-x-2">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                      <span><strong>Regla de Sistema Automatizada:</strong> El sistema calculará automáticamente el paso a "Ganado" si el <strong>Total Pagado</strong> cubre al 100% el <strong>Monto Cotizado</strong>.</span>
                    </span>
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400">Datos Personales</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2"><label className="block text-xs text-gray-400 mb-1">Nombre Completo</label><input type="text" required value={editForm.client} onChange={e => setEditForm({...editForm, client: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">DNI</label><input type="text" value={editForm.dni} onChange={e => setEditForm({...editForm, dni: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">F. Nacimiento</label><input type="date" value={editForm.birthDate || ''} onChange={e => setEditForm({...editForm, birthDate: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">Celular Principal</label><input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">Celular 2</label><input type="text" value={editForm.phone2 || ''} onChange={e => setEditForm({...editForm, phone2: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div className="sm:col-span-3"><label className="block text-xs text-gray-400 mb-1">Correo Electrónico</label><input type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div className="sm:col-span-3"><label className="block text-xs text-gray-400 mb-1">Dirección de Envío / Domicilio</label><input type="text" value={editForm.address || ''} onChange={e => setEditForm({...editForm, address: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 pt-2 border-t border-gray-800 mt-4">Clasificación</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Tipo de Cliente</label>
                      <select value={editForm.tipoCliente || 'Persona Natural'} onChange={e => setEditForm({...editForm, tipoCliente: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer">
                        <option value="Persona Natural">Persona Natural</option><option value="Persona con Negocio">Persona con Negocio</option><option value="Empresa">Empresa</option>
                      </select>
                    </div>
                    <div><label className="block text-xs text-gray-400 mb-1">Tipo Negocio</label><input type="text" value={editForm.tipoNegocio || ''} onChange={e => setEditForm({...editForm, tipoNegocio: e.target.value})} disabled={editForm.tipoCliente === 'Persona Natural'} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none disabled:opacity-50" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">Nombre Negocio</label><input type="text" value={editForm.nombreNegocio || ''} onChange={e => setEditForm({...editForm, nombreNegocio: e.target.value})} disabled={editForm.tipoCliente === 'Persona Natural'} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none disabled:opacity-50" /></div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 font-bold text-orange-400">Categoría (Equipo / Curso / Catering)</label>
                      <select value={editForm.category || 'Equipo'} onChange={e => setEditForm({...editForm, category: e.target.value})} className="w-full bg-gray-950 border border-orange-500/50 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer font-bold">
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Canal de Contacto</label>
                      <select value={editForm.contactChannel || 'WhatsApp Business'} onChange={e => setEditForm({...editForm, contactChannel: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer">
                        {CONTACT_CHANNELS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center space-x-4 pt-2">
                      <label className="flex items-center space-x-2 text-xs text-white cursor-pointer"><input type="checkbox" checked={editForm.visitaLocal || false} onChange={e => setEditForm({...editForm, visitaLocal: e.target.checked})} className="rounded bg-gray-950 border-gray-800 text-orange-500 cursor-pointer" /><span>Visita a Local</span></label>
                      <label className="flex items-center space-x-2 text-xs text-white cursor-pointer"><input type="checkbox" checked={editForm.visitaShowroom || false} onChange={e => setEditForm({...editForm, visitaShowroom: e.target.checked})} className="rounded bg-gray-950 border-gray-800 text-orange-500 cursor-pointer" /><span>Visita a Showroom</span></label>
                    </div>
                    <div className="sm:col-span-3"><label className="block text-xs text-gray-400 mb-1">Observaciones</label><input type="text" value={editForm.notes || ''} onChange={e => setEditForm({...editForm, notes: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                  </div>

                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 pt-2 border-t border-gray-800 mt-4">Control de Pagos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-xs text-gray-400 mb-1">Producto Cotizado</label><input type="text" required value={editForm.product} onChange={e => setEditForm({...editForm, product: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">Producto Comprado (Final)</label><input type="text" value={editForm.productoComprado || ''} onChange={e => setEditForm({...editForm, productoComprado: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                  </div>
                    
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <div><label className="block text-xs text-gray-400 mb-1">Monto Cotizado (S/.)</label><input type="number" min="0" required value={editForm.amount} onChange={e => setEditForm({...editForm, amount: parseFloat(e.target.value) || 0})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">Adelanto (S/.)</label><input type="number" min="0" value={editForm.advancePayment} onChange={e => setEditForm({...editForm, advancePayment: parseFloat(e.target.value) || 0})} className="w-full bg-gray-950 border border-blue-900/50 rounded-xl p-2.5 text-xs text-blue-100 focus:border-blue-500 outline-none" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1 font-bold text-green-500">Pago Total Acumulado (S/.)</label><input type="number" min="0" value={editForm.totalPaid} onChange={e => setEditForm({...editForm, totalPaid: parseFloat(e.target.value) || 0})} className="w-full bg-gray-950 border border-green-800/80 rounded-xl p-2.5 text-xs text-green-300 focus:border-green-500 outline-none font-bold" /></div>
                  </div>
                    
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Método de Pago</label>
                      <select value={editForm.paymentMethod || ''} onChange={e => setEditForm({...editForm, paymentMethod: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer">
                        <option value="">Selecciona Método</option><option value="Yape">Yape</option><option value="Plin">Plin</option><option value="Transferencia BCP">Transferencia BCP</option><option value="Transferencia BBVA">Transferencia BBVA</option><option value="Transferencia Interbank">Transferencia Interbank</option><option value="Transferencia Scotiabank">Transferencia Scotiabank</option><option value="Transferencia BanBif">Transferencia BanBif</option><option value="Transferencia Banco de la Nación">Transferencia Banco de la Nación</option><option value="Efectivo">Efectivo</option><option value="Tarjeta de Crédito/Débito (POS)">Tarjeta de Crédito/Débito (POS)</option><option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div><label className="block text-xs text-gray-400 mb-1">Código de Voucher / Op.</label><input type="text" value={editForm.voucherCode} onChange={e => setEditForm({...editForm, voucherCode: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" placeholder="Ej. 12345678" /></div>
                    <div><label className="block text-xs text-gray-400 mb-1">Fecha de Venta / Cierre</label><input type="date" value={editForm.saleDate} onChange={e => setEditForm({...editForm, saleDate: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-400 text-xs hover:text-white cursor-pointer">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-orange-600/20 cursor-pointer">Guardar Cambios & Evaluar</button>
                  </div>
                </form>
              )}
            </div>

            <div className="bg-gray-950 p-4 border-t border-gray-800 flex justify-between items-center shrink-0">
              <button type="button" onClick={() => deleteDeal(selectedDeal.id)} className="text-red-400 hover:text-red-300 text-xs flex items-center space-x-1 cursor-pointer"><Trash2 size={14} /><span>Eliminar Registro</span></button>
              <button type="button" onClick={() => setSelectedDeal(null)} className="bg-gray-800 hover:bg-gray-700 text-white text-xs px-4 py-2 rounded-xl font-semibold cursor-pointer">Cerrar Ficha</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gray-950 p-4 border-b border-gray-800 flex justify-between items-center shrink-0">
              <h2 className="text-sm font-bold text-white flex items-center"><Plus size={16} className="text-orange-500 mr-1.5" /> Nuevo Registro de Cliente</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddDeal} className="p-6 space-y-3 overflow-y-auto flex-1">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-orange-400 border-b border-gray-800 pb-1 mb-2">1. Datos Personales</h3>
              <div><label className="block text-xs text-gray-400 mb-1">Nombre Completo del Cliente *</label><input type="text" required value={newDeal.client} onChange={e => setNewDeal({...newDeal, client: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" placeholder="Ej. Sebastian Hutchinson" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-400 mb-1">DNI</label><input type="text" value={newDeal.dni} onChange={e => setNewDeal({...newDeal, dni: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">F. Nacimiento</label><input type="date" value={newDeal.birthDate} onChange={e => setNewDeal({...newDeal, birthDate: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Celular Principal</label><input type="text" value={newDeal.phone} onChange={e => setNewDeal({...newDeal, phone: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Celular 2</label><input type="text" value={newDeal.phone2} onChange={e => setNewDeal({...newDeal, phone2: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
              </div>
              <div><label className="block text-xs text-gray-400 mb-1">Correo Electrónico</label><input type="email" value={newDeal.email} onChange={e => setNewDeal({...newDeal, email: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Dirección de Envío / Domicilio</label><input type="text" value={newDeal.address} onChange={e => setNewDeal({...newDeal, address: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" placeholder="Dirección completa de entrega" /></div>

              <h3 className="text-[10px] font-bold uppercase tracking-wider text-orange-400 border-b border-gray-800 pb-1 mb-2 mt-4">2. Clasificación</h3>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Tipo de Cliente</label>
                <select value={newDeal.tipoCliente} onChange={e => setNewDeal({...newDeal, tipoCliente: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer">
                  <option value="Persona Natural">Persona Natural</option><option value="Persona con Negocio">Persona con Negocio</option><option value="Empresa">Empresa</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-gray-400 mb-1">Tipo Negocio</label><input type="text" value={newDeal.tipoNegocio} onChange={e => setNewDeal({...newDeal, tipoNegocio: e.target.value})} disabled={newDeal.tipoCliente === 'Persona Natural'} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none disabled:opacity-50" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Nombre Negocio</label><input type="text" value={newDeal.nombreNegocio} onChange={e => setNewDeal({...newDeal, nombreNegocio: e.target.value})} disabled={newDeal.tipoCliente === 'Persona Natural'} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none disabled:opacity-50" /></div>
              </div>
              <div>
                <label className="block text-xs font-bold text-orange-400 mb-1">Categoría (Equipo / Curso / Catering) *</label>
                <select value={newDeal.category} onChange={e => setNewDeal({...newDeal, category: e.target.value})} className="w-full bg-gray-950 border border-orange-500/50 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer font-bold">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Canal de Contacto</label>
                <select value={newDeal.contactChannel} onChange={e => setNewDeal({...newDeal, contactChannel: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer">
                  {CONTACT_CHANNELS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
                </select>
              </div>
              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-2 text-xs text-white cursor-pointer"><input type="checkbox" checked={newDeal.visitaLocal} onChange={e => setNewDeal({...newDeal, visitaLocal: e.target.checked})} className="rounded bg-gray-950 border-gray-800 text-orange-500 cursor-pointer" /><span>Visita a Local</span></label>
                <label className="flex items-center space-x-2 text-xs text-white cursor-pointer"><input type="checkbox" checked={newDeal.visitaShowroom} onChange={e => setNewDeal({...newDeal, visitaShowroom: e.target.checked})} className="rounded bg-gray-950 border-gray-800 text-orange-500 cursor-pointer" /><span>Visita a Showroom</span></label>
              </div>

              <h3 className="text-[10px] font-bold uppercase tracking-wider text-orange-400 border-b border-gray-800 pb-1 mb-2 mt-4">3. Cotización y Pagos</h3>
              <div><label className="block text-xs text-gray-400 mb-1">Producto Cotizado *</label><input type="text" required value={newDeal.product} onChange={e => setNewDeal({...newDeal, product: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" placeholder="Parrilla / Cilindro / Catering" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div><label className="block text-[10px] text-gray-400 mb-1">Monto Cotizado (S/.) *</label><input type="number" min="0" required value={newDeal.amount} onChange={e => setNewDeal({...newDeal, amount: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                <div><label className="block text-[10px] text-gray-400 mb-1">Adelanto (S/.)</label><input type="number" min="0" value={newDeal.advancePayment} onChange={e => setNewDeal({...newDeal, advancePayment: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
                <div><label className="block text-[10px] text-gray-400 mb-1">Total Pagado (S/.)</label><input type="number" min="0" value={newDeal.totalPaid} onChange={e => setNewDeal({...newDeal, totalPaid: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none" /></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-[10px] text-gray-400 mb-1">Método de Pago</label>
                  <select value={newDeal.paymentMethod} onChange={e => setNewDeal({...newDeal, paymentMethod: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 outline-none cursor-pointer">
                    <option value="">Selecciona Método</option><option value="Yape">Yape</option><option value="Plin">Plin</option><option value="Transferencia BCP">Transferencia BCP</option><option value="Transferencia BBVA">Transferencia BBVA</option><option value="Transferencia Interbank">Transferencia Interbank</option><option value="Transferencia Scotiabank">Transferencia Scotiabank</option><option value="Transferencia BanBif">Transferencia BanBif</option><option value="Transferencia Banco de la Nación">Transferencia Banco de la Nación</option><option value="Efectivo">Efectivo</option><option value="Tarjeta de Crédito/Débito (POS)">Tarjeta de Crédito/Débito (POS)</option><option value="Otro">Otro</option>
                  </select>
                </div>
                <div><label className="block text-[10px] text-gray-400 mb-1">Código de Voucher / Op.</label><input type="text" value={newDeal.voucherCode} onChange={e => setNewDeal({...newDeal, voucherCode: e.target.value})} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-gray-700 outline-none" /></div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 text-xs hover:text-white cursor-pointer">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-orange-600/20 cursor-pointer">Guardar Nuevo Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// forzar actualizacion 
