'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { apiGet, apiDelete } from '../../lib/api'
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

export default function ResidentesPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewItem, setViewItem] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const data = await apiGet('/residentes')
      setItems(data)
    } catch (e) {
      toast.error('No se pudo cargar la lista')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function onDelete(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDelete(`/residentes/${id}`)
          toast.success('Residente eliminado')
          load()
        } catch {
          toast.error('No se pudo eliminar')
        }
      }
    })
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Residentes de Softwareland</h1>
        {/* CORRECCIÓN #1: La ruta ahora es /nuevo */}
        <Link href="/residentes/nuevo" className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
          <FaPlus /> Nuevo
        </Link>
      </div>

      {loading ? <p>Cargando…</p> : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Foto</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Carrera</th>
                <th className="p-3 text-left">Correo</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
              <tbody>{}
                {items.map(r => (
                  <tr key={r.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="p-2">
                      <img src={`http://localhost:4000${r.foto}` || 'https://via.placeholder.com/40'} alt="Foto" className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="p-2">{r.nombre} {r.apellido}</td>
                    <td className="p-2">{r.carrera}</td>
                    <td className="p-2">{r.correo}</td>
                    <td className="p-2 text-center space-x-2">
                      <button onClick={() => setViewItem(r)} className="p-2 text-blue-600 hover:text-blue-800"><FaEye size={18} /></button>
                      <Link href={`/residentes/editar/${r.id}`} className="p-2 text-yellow-500 hover:text-yellow-700 inline-block"><FaEdit size={18} /></Link>
                      <button onClick={() => onDelete(r.id)} className="p-2 text-red-600 hover:text-red-800"><FaTrash size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      )}

      {/* Modal de visualización */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl text-gray-800" onClick={e => e.stopPropagation()}>            <div className="flex items-start">
              <img src={`http://localhost:4000${viewItem.foto}` || 'https://via.placeholder.com/150'} alt="Foto" className="w-32 h-32 rounded-lg object-cover mr-6 border" />
              <div>
                <h2 className="text-2xl font-bold mb-2">{viewItem.nombre} {viewItem.apellido}</h2>
                <p><strong>Instituto:</strong> {viewItem.instituto}</p>
                <p><strong>Carrera:</strong> {viewItem.carrera}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <p><strong>Género:</strong> {viewItem.genero}</p>
              <p><strong>Fecha Nac.:</strong> {new Date(viewItem.fecha_nacimiento).toLocaleDateString()}</p>
              <p><strong>Teléfono:</strong> {viewItem.telefono}</p>
              <p><strong>Correo:</strong> {viewItem.correo}</p>
              <div className="col-span-2">
                <strong>Lenguajes:</strong>
                <div className="flex flex-wrap gap-2 mt-1">
                  {viewItem.lenguajes && Object.entries(viewItem.lenguajes).filter(([_, v]) => v).map(([k]) => (
                    <span key={k} className="bg-gray-200 px-2 py-1 rounded-full text-xs">{k}</span>
                  ))}
                </div>
              </div>
              <p className="col-span-2"><strong>Notas:</strong> {viewItem.notas || '—'}</p>
            </div>
            <div className="mt-6 text-right">
              <button onClick={() => setViewItem(null)} className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
