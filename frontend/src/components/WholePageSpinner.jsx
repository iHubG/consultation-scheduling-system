import { PulseLoader } from 'react-spinners'

const Spinner = ({ size = 15, color = '#7c3aed', loading = true }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <PulseLoader color={color} loading={loading} size={size} />
    </div>
  )
}

export default Spinner
