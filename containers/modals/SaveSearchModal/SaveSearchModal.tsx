import type { NextPage } from 'next'
import type { SavedSearchData } from '../../../store/user/userSlice'
import { useForm } from 'react-hook-form'
import formStyles from '../../../styles/forms.module.css'
import { useAppDispatch, useAppSelector } from '../../../hooks/app_hooks'
import {
  selectModalOpen,
  closeModal
} from '../../../store/application/applicationSlice'
import {
  selectCurrentUser,
  createSavedSearch
} from '../../../store/user/userSlice'
import { selectLocationSearchField } from '../../../store/filters/filtersSelectors'
import Modal from '../../../components/design_system/modal/Modal/Modal'
import ModalHeader from '../../../components/design_system/modal/ModalHeader/ModalHeader'
import ModalBody from '../../../components/design_system/modal/ModalBody/ModalBody'
import ModalFooter from '../../../components/design_system/modal/ModalFooter/ModalFooter'
import TextButton from '../../../components/design_system/TextButton/TextButton'
import ContainedButton from '../../../components/design_system/ContainedButton/ContainedButton'
import { selectParamsForGeocodeSearch } from '../../../store/listingSearch/listingSearchSelectors'

export interface SaveSearchModalProps {
  title: string
}

export type SaveSearchFormData = Pick<
  SavedSearchData,
  'name' | 'messageCadence'
>

const SaveSearchModal: NextPage<SaveSearchModalProps> = ({ title }) => {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)
  const locationSearchField = useAppSelector(selectLocationSearchField)
  const paramsForGeocodeSearch = useAppSelector(selectParamsForGeocodeSearch)
  const currentUser = useAppSelector(selectCurrentUser)

  const { register, handleSubmit } = useForm<SaveSearchFormData>({
    defaultValues: {
      name: locationSearchField,
      messageCadence: 1
    }
  })

  const handleClose = () => dispatch(closeModal())

  const handleSave = (formData: SaveSearchFormData) => {
    if (!currentUser?.id) {
      console.error("No user user id available")
      return
    }
    dispatch(
      createSavedSearch({
        userId: currentUser.id,
        name: formData.name,
        messageCadence: Number(formData.messageCadence),
        searchParams: paramsForGeocodeSearch
      })
    )
    // should maybe wait for saved search to be created, then publish a toast upon success. we could do all of this
    // inside of the createSavedSearch.fulfilled reducer
    handleClose()
  }

  return (
    <Modal
      isOpen={modalOpen}
      contentLabel='Save Search'
      onRequestClose={handleClose}
    >
      <ModalHeader title={title} onClose={handleClose} />
      <form onSubmit={handleSubmit(handleSave)}>
        <ModalBody>
          <div className={formStyles.inputGroup}>
            <label htmlFor='name' className={formStyles.label}>
              Name
            </label>
            <input
              id='name'
              type='text'
              className={formStyles.input}
              {...register('name')}
            />
          </div>
          <div className={formStyles.inputGroup}>
            <label htmlFor='messageCadence' className={formStyles.label}>
              Email Me
            </label>
            <select
              id='messageCadence'
              className={formStyles.select}
              {...register('messageCadence')}
            >
              <option value={1}>Daily</option>
              <option value={7}>Weekly</option>
              <option value={0}>Never</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <TextButton type='button' onClick={handleClose}>
            Cancel
          </TextButton>
          <ContainedButton type='submit'>Save</ContainedButton>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default SaveSearchModal
