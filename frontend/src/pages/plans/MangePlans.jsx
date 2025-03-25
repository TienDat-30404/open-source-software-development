import { useEffect, useState } from 'react';

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [planForm, setPlanForm] = useState({
    name: '',
    price: '',
    description: '',
    duration_days: '',
  });
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/plans');
      const data = await res.json();
      setPlans(data.data);
    } catch (err) {
      console.error('Error fetching plans:', err);
    }
  };

  const handleSavePlan = async () => {
    if (
      !planForm.name ||
      !planForm.price ||
      !planForm.description ||
      !planForm.duration_days
    )
      return;

    if (editingPlan) {
      // Cập nhật gói
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/plans/${editingPlan.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planForm),
          }
        );

        if (res.ok) {
          setPlans(
            plans.map((plan) =>
              plan.id === editingPlan.id
                ? { ...planForm, id: editingPlan.id }
                : plan
            )
          );
          resetForm();
        }
      } catch (err) {
        console.error('Error updating plan:', err);
      }
    } else {
      // Thêm mới gói
      try {
        const res = await fetch('http://127.0.0.1:8000/api/plans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(planForm),
        });

        if (res.ok) {
          const addedPlan = await res.json();
          setPlans([...plans, addedPlan.data]);
          resetForm();
        }
      } catch (err) {
        console.error('Error adding plan:', err);
      }
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanForm(plan);
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa gói này?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/plans/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPlans(plans.filter((plan) => plan.id !== id));
      }
    } catch (err) {
      console.error('Error deleting plan:', err);
    }
  };

  const resetForm = () => {
    setPlanForm({ name: '', price: '', description: '', duration_days: '' });
    setEditingPlan(null);
  };
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 2000);
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Quản lý gói dịch vụ
      </h2>
      {/* Bảng danh sách gói */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-auto max-h-96">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Tên gói</th>
                <th className="p-3 text-left">Giá</th>
                <th className="p-3 text-left">Mô tả</th>
                <th className="p-3 text-left">Thời gian (ngày)</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-t">
                  <td className="p-3">{plan.name}</td>
                  <td className="p-3">{plan.price}</td>
                  <td className="p-3">{plan.description}</td>
                  <td className="p-3">{plan.duration_days}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditPlan(plan)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form thêm / sửa gói */}
      <div className="flex flex-col gap-4 w-full max-w-lg bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-bold">
          {editingPlan ? '✏️ Chỉnh sửa gói' : '➕ Thêm gói mới'}
        </h3>
        <input
          type="text"
          placeholder="Tên gói"
          value={planForm.name}
          onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="number"
          placeholder="Giá"
          value={planForm.price}
          onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
          className="border rounded p-2"
        />
        <textarea
          placeholder="Mô tả"
          value={planForm.description}
          onChange={(e) =>
            setPlanForm({ ...planForm, description: e.target.value })
          }
          className="border rounded p-2 h-24 resize-none"
        />
        <input
          type="number"
          placeholder="Số ngày"
          value={planForm.duration_days}
          onChange={(e) =>
            setPlanForm({ ...planForm, duration_days: e.target.value })
          }
          className="border rounded p-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSavePlan}
            className={`px-4 py-2 rounded text-white ${
              editingPlan
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {editingPlan ? 'Lưu chỉnh sửa' : 'Thêm'}
          </button>
          {editingPlan && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Hủy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
