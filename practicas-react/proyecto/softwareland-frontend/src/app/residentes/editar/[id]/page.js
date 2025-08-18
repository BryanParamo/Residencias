'use client'
// 1. Importar useState para manejar la foto actual
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { apiGet, apiForm } from '../../../../lib/api'

// El schema no necesita el campo 'foto', ya que es opcional y se maneja por separado
const schema = yup.object({
  nombre: yup.string().required(),
  apellido: yup.string().required(),
  genero: yup.mixed().oneOf(['Masculino','Femenino']).required(),
  fecha_nacimiento: yup.date().max(new Date()).required(),
  telefono: yup.string().matches(/^\d{10}$/, 'Debe tener 10 dígitos').required(),
  correo: yup.string().email().required(),
  instituto: yup.string().required(),
  carrera: yup.string().oneOf([
    'Ingenieria en Sistemas Computacionales',
    'Ingenieria en Tecnologias de la Informacion',
    'Ingenieria en Informatica',
    'Ingenieria en Gestion Empresarial'
  ]).required(),
  notas: yup.string().optional(),
  ljavascript: yup.boolean(),
  ltypescript: yup.boolean(),
  lhtml: yup.boolean(),
  lphp: yup.boolean(),
  lpython: yup.boolean(),
  lcmasmas: yup.boolean(),
  lcsharp: yup.boolean(),
})

export default function Editar() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema)})

  // 2. Crear un estado para guardar la URL de la foto actual
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);

  useEffect(() => {
    if (!id) return
    apiGet(`/residentes/${id}`).then(data => {
      // 3. Cargar todos los campos EXCEPTO la foto en el formulario
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'foto') {
          setValue(key, value)
        }
      });

      // 4. Guardar la URL de la foto en nuestro nuevo estado
      if (data.foto) {
        setCurrentPhotoUrl(`http://localhost:4000${data.foto}`);
      }
      
      if (data.lenguajes) {
        setValue('ljavascript', data.lenguajes['JavaScript']);
        setValue('ltypescript', data.lenguajes['TypeScript']);
        setValue('lhtml', data.lenguajes['HTML+CSS']);
        setValue('lphp', data.lenguajes['PHP']);
        setValue('lpython', data.lenguajes['Python']);
        setValue('lcmasmas', data.lenguajes['C++']);
        setValue('lcsharp', data.lenguajes['C#']);
      }
    }).catch(() => toast.error('No se pudo cargar el residente'))
  }, [id, setValue])

  // La función onSubmit ya estaba bien, no necesita cambios.
  // Solo enviará la foto si se selecciona una nueva.
  const onSubmit = async (values) => {
    const form = new FormData()
    const langKeys = ['ljavascript', 'ltypescript', 'lhtml', 'lphp', 'lpython', 'lcmasmas', 'lcsharp'];

    Object.entries(values).forEach(([k, v]) => {
      if (k !== 'foto' && k !== 'lenguajes' && k !== 'id' && !langKeys.includes(k)) {
        form.append(k, String(v ?? ''))
      }
    })
    
    const lenguajes = {
      'JavaScript': !!values.ljavascript,
      'TypeScript': !!values.ltypescript,
      'HTML+CSS': !!values.lhtml,
      'PHP': !!values.lphp,
      'Python': !!values.lpython,
      'C++': !!values.lcmasmas,
      'C#': !!values.lcsharp
    }
    form.append('lenguajes', JSON.stringify(lenguajes))

    if (values.foto?.[0]) {
      form.append('foto', values.foto[0])
    }

    try {
      await apiForm(`/residentes/${id}`, 'PUT', form)
      toast.success('Residente actualizado')
      router.push('/residentes')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Residente #{id}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ... (resto de los inputs del formulario) ... */}
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded w-full" placeholder="Nombre" {...register('nombre')} />
          <input className="border p-2 rounded w-full" placeholder="Apellido" {...register('apellido')} />
          <select className="border p-2 rounded w-full" {...register('genero')}>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <input className="border p-2 rounded w-full" type="date" {...register('fecha_nacimiento')} />
          <input className="border p-2 rounded w-full" placeholder="Teléfono (10 dígitos)" {...register('telefono')} />
          <input className="border p-2 rounded w-full" placeholder="Correo" {...register('correo')} />
        </div>
        
        <input className="border p-2 rounded w-full" placeholder="Instituto de Procedencia" {...register('instituto')} />
        
        <select className="border p-2 rounded w-full" {...register('carrera')}>
          <option>Ingenieria en Sistemas Computacionales</option>
          <option>Ingenieria en Tecnologias de la Informacion</option>
          <option>Ingenieria en Informatica</option>
          <option>Ingenieria en Gestion Empresarial</option>
        </select>

        <div className="p-2 border rounded">
          <p className="font-medium mb-2">Lenguajes de Programación</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" {...register('ljavascript')} /> JavaScript</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('ltypescript')} /> TypeScript</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('lhtml')} /> HTML+CSS</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('lphp')} /> PHP</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('lpython')} /> Python</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('lcmasmas')} /> C++</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('lcsharp')} /> C#</label>
          </div>
        </div>

        <textarea className="border p-2 rounded w-full" placeholder="Notas" {...register('notas')}></textarea>
        
        {/* 5. Mostrar la foto actual y el input para cambiarla */}
        <div className="p-2 border rounded">
            <p className="font-medium mb-2">Foto</p>
            {currentPhotoUrl && (
                <div className="mb-2">
                    <p className="text-sm text-gray-400 mb-1">Foto actual:</p>
                    <img src={currentPhotoUrl} alt="Foto actual del residente" className="w-24 h-24 rounded-lg object-cover" />
                </div>
            )}
            <label className="block text-sm text-gray-400 mb-1">
                {currentPhotoUrl ? 'Seleccionar archivo para reemplazarla:' : 'Seleccionar archivo:'}
            </label>
            <input className="w-full" type="file" accept="image/*" {...register('foto')} />
        </div>

        <div className="flex items-center gap-4 pt-4">
            <Link href="/residentes" className="text-center w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Regresar
            </Link>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Guardar cambios
            </button>
        </div>
        <div className="mt-2 text-sm text-red-500">
            {Object.values(errors).map((e,i)=><p key={i}>• {e.message}</p>)}
        </div>
      </form>
    </div>
  )
}
