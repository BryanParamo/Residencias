'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { apiForm } from '../../../lib/api'

const schema = yup.object({
  nombre: yup.string().required('Requerido'),
  apellido: yup.string().required('Requerido'),
  genero: yup.mixed().oneOf(['Masculino','Femenino']).required('Requerido'),
  fecha_nacimiento: yup.date().max(new Date(), 'No puede ser después de hoy').required('Requerido'),
  telefono: yup.string().matches(/^\d{10}$/, '10 dígitos').required('Requerido'),
  correo: yup.string().email('Correo inválido').required('Requerido'),
  instituto: yup.string().required('Requerido'),
  carrera: yup.string().oneOf([
    'Ingenieria en Sistemas Computacionales',
    'Ingenieria en Tecnologias de la Informacion',
    'Ingenieria en Informatica',
    'Ingenieria en Gestion Empresarial'
  ]).required('Requerido'),
  notas: yup.string().optional()
})

export default function Nuevo() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema)})

  const onSubmit = async (values) => {
    const form = new FormData()
    
    // Lista de los nombres de los checkboxes para poder ignorarlos
    const langKeys = ['ljavascript', 'ltypescript', 'lhtml', 'lphp', 'lpython', 'lcmasmas', 'lcsharp'];

    // 1. Añadir los campos básicos, IGNORANDO los checkboxes individuales
    Object.entries(values).forEach(([k, v]) => {
      if (k !== 'foto' && !langKeys.includes(k)) {
        form.append(k, String(v ?? ''))
      }
    })

    // 2. Crear el objeto 'lenguajes' a partir de los valores de los checkboxes
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

    // 3. Añadir la foto si existe
    if (values.foto?.[0]) {
      form.append('foto', values.foto[0])
    }

    // 4. Enviar el formulario
    try {
      await apiForm('/residentes', 'POST', form)
      toast.success('Residente creado')
      reset()
      router.push('/residentes')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo Residente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <input className="border p-2" placeholder="Nombre" {...register('nombre')} />
        <input className="border p-2" placeholder="Apellido" {...register('apellido')} />
        <select className="border p-2" {...register('genero')}>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <input className="border p-2" type="date" {...register('fecha_nacimiento')} />
        <input className="border p-2" placeholder="Teléfono (10 dígitos)" {...register('telefono')} />
        <input className="border p-2" placeholder="Correo" {...register('correo')} />
        <input className="border p-2 col-span-2" placeholder="Instituto de Procedencia" {...register('instituto')} />
        <select className="border p-2 col-span-2" {...register('carrera')}>
          <option>Ingenieria en Sistemas Computacionales</option>
          <option>Ingenieria en Tecnologias de la Informacion</option>
          <option>Ingenieria en Informatica</option>
          <option>Ingenieria en Gestion Empresarial</option>
        </select>

        <div className="col-span-2">
          <p className="font-medium mb-1">Lenguajes</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <label><input type="checkbox" {...register('ljavascript')} /> JavaScript</label>
            <label><input type="checkbox" {...register('ltypescript')} /> TypeScript</label>
            <label><input type="checkbox" {...register('lhtml')} /> HTML+CSS</label>
            <label><input type="checkbox" {...register('lphp')} /> PHP</label>
            <label><input type="checkbox" {...register('lpython')} /> Python</label>
            <label><input type="checkbox" {...register('lcmasmas')} /> C++</label>
            <label><input type="checkbox" {...register('lcsharp')} /> C#</label>
          </div>
        </div>

        <textarea className="border p-2 col-span-2" placeholder="Notas" {...register('notas')}></textarea>
        <input className="col-span-2" type="file" accept="image/*" {...register('foto')} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-2">Guardar</button>
      </form>

      {/* errores simples */}
      <div className="mt-4 text-sm text-red-600">
        {Object.values(errors).map((e,i)=><p key={i}>• {e.message}</p>)}
      </div>
    </div>
  )
}
