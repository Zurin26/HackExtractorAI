
/**
 * 
 * @param {import("@azure/storage-file-share").ShareFileClient} fsClient
 * 
 */
// function fileShareCreateDirectory(fsClient, folders = [], idx = 0) {
//   if(idx == 0) {
//     currDirectory = fsClient.get(folders[idx])
//     try:
//         currDirectory.create_directory()
//     except:
//         logging.info('Exists already')
//     finally:
//         fileShareCreateDirectory(fsClient, folders, idx+1)
//   }
//   elif idx < len(folders) - 1:
//       parentPath = '/'.join(folders[0:idx])
//       logging.info(f"Path: {parentPath}")
//       parentDir = fsClient.get_directory_client(parentPath)
//       try:
//           parentDir.create_subdirectory(folders[idx])
//       except:
//           logging.info('Exists already')
//       finally:
//           if idx != len(folders) - 2:
//               fileShareCreateDirectory(fsClient, folders, idx+1)
// }