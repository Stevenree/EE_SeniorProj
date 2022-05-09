type page = {
  base64: string,
  width: number,
  height: number,
  boxes: box[],
}

type panelRegion = {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
}

type box = {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  text: word[],
  panel: panelRegion,
}

type word = {
  token: string,
  lemma: string,
  pos: string,
  definitions: string[],
}

type regionProps = {
	xyxy: number[],
	naturalArea: number[],
	tokens: word[],
	panelRegion: panelRegion,
	setToken: any, // idk what the type of a const function is lol
	setDefinition: any,
	setSentence: any,
  setPos:any,
	togglePopup: any,
	setPanelRegion: any,
}

type popupProps = {
  token: string,
  sentence: string,
  definitions: string[], // probably a list tbh
  pos:string,
  panelRegion: panelRegion,
  base64Image: string,
}


export type {page, panelRegion, box, word, regionProps, popupProps}