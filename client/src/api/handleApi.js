import { Get } from './axios';



export const handleApi = async (data) => {
  let { tab, message } = data;
  let key = 'update'
  let allData = {}
  switch (tab) {
    case 'My Appointments':
      message.loading({ content: 'Loading...', key });
      try {
        allData = await Get(`/appointment`)
        message.success({ content: 'Loaded!', key, duration: 1 });
        return allData.data;
      } catch (error) {
        message.error({ content: error, key, duration: 2 })
        return []
      }
    case 'My Schedule':
      message.loading({ content: 'Loading...', key });
      try {
        allData = await Get(`/appointment`)
        message.success({ content: 'Loaded!', key, duration: 1 });
        return allData.data;
      } catch (error) {
        message.error({ content: error, key, duration: 2 })
        return []
      }
    default:
      message.loading({ content: 'Loading...', key });
      try {
        allData = await Get(`/appointment`)
        message.success({ content: 'Loaded!', key, duration: 1 });
        return allData.data;
      } catch (error) {
        message.error({ content: error, key, duration: 2 })
        return []
      }

  }
}