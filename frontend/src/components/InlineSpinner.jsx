import { PulseLoader } from 'react-spinners'

const InlineSpinner = ({ size = 10, color = '#7c3aed', loading = true }) => {
  if (!loading) return null
  return (
    <div className="flex justify-center py-4">
      <PulseLoader color={color} loading={loading} size={size} />
    </div>
  )
}

export default InlineSpinner
