import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Save, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { auth } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AccountProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Account: React.FC<AccountProps> = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('germinah_user');
    return userData ? JSON.parse(userData) : { name: 'Usuário', email: 'usuario@email.com' };
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Update user data in localStorage
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      };
      
      setUser(updatedUser);
      localStorage.setItem('germinah_user', JSON.stringify(updatedUser));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Erro ao salvar perfil');
    }
    
    setIsLoading(false);
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, you would update the password via Supabase
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError('Erro ao alterar senha');
    }
    
    setIsLoading(false);
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      setError('Erro ao excluir conta');
    }
    
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const accountStats = [
    { label: 'Membro desde', value: 'Dezembro 2024' },
    { label: 'Plantas cadastradas', value: '6' },
    { label: 'Irrigações realizadas', value: '142' },
    { label: 'Água economizada', value: '45.2L' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Minha Conta</h1>
        <p className="text-gray-600 mt-1">Gerencie suas informações pessoais e configurações de conta</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
          <span className="text-green-800">Informações atualizadas com sucesso!</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
          <span className="text-red-800">{error}</span>
        </div>
      )}

      {/* Account Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {accountStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-3 rounded-lg mr-4">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Informações Pessoais</h2>
            <p className="text-gray-600 text-sm">Atualize seus dados pessoais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSaveProfile}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 disabled:opacity-50 flex items-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-lg mr-4">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Alterar Senha</h2>
            <p className="text-gray-600 text-sm">Mantenha sua conta segura com uma senha forte</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha Atual
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.current ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nova Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleChangePassword}
            disabled={isLoading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50 flex items-center"
          >
            <Lock className="h-4 w-4 mr-2" />
            Alterar Senha
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logout */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sair da Conta</h3>
          <p className="text-gray-600 text-sm mb-4">
            Desconecte-se do sistema de forma segura
          </p>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-500/50 transition-all duration-300"
          >
            Sair
          </button>
        </div>

        {/* Delete Account */}
        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Excluir Conta</h3>
          <p className="text-gray-600 text-sm mb-4">
            Esta ação é irreversível e apagará todos os seus dados
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 flex items-center"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir Conta
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Confirmar Exclusão</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos permanentemente.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Excluindo...
                  </div>
                ) : (
                  'Excluir Conta'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;