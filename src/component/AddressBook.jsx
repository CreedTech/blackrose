// components/AddressBook.jsx
import { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import AddressForm from './AddressForm';

const AddressBook = () => {
  const { addresses, deleteAddress } = useContext(ShopContext);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setDeletingId(addressId);
      await deleteAddress(addressId);
      setDeletingId(null);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Saved Addresses</h3>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <FaPlus /> Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg">
          <FaMapMarkerAlt className="text-4xl text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No saved addresses yet</p>
          <button
            onClick={handleAddNew}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-black p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {address.label}
                    {address.isDefault && (
                      <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </h4>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-gray-400 hover:text-white transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(address._id)}
                    disabled={deletingId === address._id}
                    className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <p className="font-medium">{address.fullName}</p>
                <p className="text-gray-400">{address.address}</p>
                <p className="text-gray-400">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-400 mt-2">{address.phone}</p>
                {address.email && (
                  <p className="text-gray-400">{address.email}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddressForm && (
        <AddressForm
          address={editingAddress}
          onClose={() => {
            setShowAddressForm(false);
            setEditingAddress(null);
          }}
          onSuccess={() => {
            setShowAddressForm(false);
            setEditingAddress(null);
          }}
        />
      )}
    </div>
  );
};

export default AddressBook;
