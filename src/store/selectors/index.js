export const getMelodyById = (id, melodies) => 
  (Array.isArray(melodies) && melodies.length > 0)
    ? melodies.find((melody) => (melody.id === id)) || melodies[0]
    : false
