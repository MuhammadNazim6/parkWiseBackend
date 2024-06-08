import { IProviderRepository } from "../../interface/repository/IProviderRepository";
import IHashpassword from "../../interface/services/IHashpassword";

export const checkProvPassword = async (
  providerRepository: IProviderRepository,
  bcrypt: IHashpassword,
  provId: string,
  password: string
): Promise<boolean> => {
  try {
    const provider = await providerRepository.findProviderWithId(provId)
    if (provider) {
      const checked = await bcrypt.compare(password, provider.password)
      if (checked) {
        return true
      }
    } 
    return false

  } catch (error) {
    throw error
  }
}
