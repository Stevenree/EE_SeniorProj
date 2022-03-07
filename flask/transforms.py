# Figuring out the classes so that we dont need detectronv2 dependency
# Get Image Ratio --> Apply transform --> Add divisible by 32 padding 
import torch
from PIL import Image
import numpy as np

class ImageRatioTransform():
  """
  This class only calculates the desired resized ratio of the image.
  getTransform() returns a ResizeTransform where the transform can then be applied.
  """

  def __init__(self, shortest_length:int, max_length:int):
    """
    Shortest length is the shortest length a single side can take.
    Max length is the maximum side an image can take.
    """
    self.shortest_length = shortest_length      # 800
    self.max_length = max_length                # 1333

  def getTransform(self, image):
    """
    Takes image in (H,W,C) format.
    """
    assert len(image.shape) == 3, (f'Image has {len(image.shape)} dimensions, requires 3 (H,W,C)')
    h,w = image.shape[:2]
    newh, neww = self.__get_output_shape(h, w)
    return ImageResizeTransform(image, newh, neww)

  def __get_output_shape(self, oldh:int, oldw:int):
    """
    Gets the desired resized shape
    """
    h, w = oldh, oldw
    size = self.shortest_length * 1.0
    scale = size / min(h,w) # Initial scaling factor
    # Scale down
    if h < w:
      newh, neww = size, scale*w
    else:
      newh, neww = scale*h, size
    # Check to ensure did not exceed max length
    if max(newh, neww) > self.max_length:
      scale = self.max_length * 1.0 / max(newh, neww)
      newh = newh * scale
      neww = neww * scale

    neww = int(neww + 0.5)
    newh = int(newh + 0.5)
    return (newh, neww)

class ImageResizeTransform():
  
  def __init__(self, image, newh, neww):
    self.data = image # (H,W,C)
    self.newh = newh
    self.neww = neww
  
  def apply_transform(self, interp_method=Image.BILINEAR, tensor_format=False, device="cpu"):
    # Expects (H,W,C) in BGR (RGB won't crash)
    pil_image = Image.fromarray(self.data)
    pil_image = pil_image.resize( (self.neww, self.newh), interp_method)
    img_data = np.asarray(pil_image)

    if tensor_format==True:
      # (H,W,C) --> (C,H,W)
      img_data = torch.as_tensor( img_data.astype("float32").transpose(2,0,1), device=device ) 
      # (C,H,W) --> (1,C,H,W)
      img_data = img_data[None, :]
      # Pad to div 32
      h_diff, w_diff = (32-self.newh%32)%32, (32-self.neww%32)%32
      # print(f' Padding h:{h_diff}, Padding w:{w_diff}')
      img_data = torch.nn.functional.pad(img_data, ( 0,w_diff, 0,h_diff ) ) # zeropad to divisibility of 32

      # Create the meta_data
      scale = self.data.shape[0] / self.newh
      print(self.data.shape[0], self.newh)
      meta_data = torch.as_tensor( [self.newh, self.neww, scale], device=device)
      meta_data = meta_data[None, :]

      return (img_data, meta_data)
      
    return img_data