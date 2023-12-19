import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import axios from 'axios';

const AddressList = ({navigation}) => {
  const [address, setAddress] = useState({
    data: [],
    dataType: 'p',
    divisionCode: '0',
    province: null,
    provinceId: '0',
    district: null,
    districtId: '0',
    ward: null,
    wardId: '0',
    error: null,
  });

  const dataAddress = `${address.ward}, ${address.district}, ${address.province}`;

  useEffect(() => {
    const fetchDataDistricts = async () => {
      try {
        const response = await axios(
          `https://mall.shopee.vn/api/v4/location/get_child_division_list?use_case=shopee.account&division_id=${address.divisionCode}`,
        );
        setAddress({...address, data: response.data.data.divisions});
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataDistricts();
  }, [address.divisionCode]);

  const itemClick = ({item}) => {
    switch (address.dataType) {
      case 'p':
        handleProvinceClick(item);
        break;
      case 'd':
        handleDistrictClick(item);
        break;
      case 'w':
        handleWardClick(item);
        break;
    }
  };

  const handleProvinceClick = item => {
    setAddress({
      ...address,
      province: item.division_name,
      provinceId: item.id,
      divisionCode: item.id,
      district: null,
      districtId: '0',
      ward: null,
      wardId: '0',
      dataType: 'd',
      error: null,
    });
  };

  const handleDistrictClick = item => {
    setAddress({
      ...address,
      divisionCode: item.id,
      district: item.division_name,
      districtId: item.id,
      ward: null,
      wardId: '0',
      dataType: 'w',
      error: null,
    });
  };

  const handleWardClick = item => {
    setAddress({...address, ward: item.division_name, error: null});
    checkAndNavigate();
  };

  const checkAndNavigate = () => {
    if (address.province && address.district && address.ward) {
      navigation.navigate('AddAddress', {
        address: dataAddress,
      });
    } else {
      handleError();
    }
  };

  const handleError = () => {
    if (!address.province) {
      setAddress({...address, dataType: 'p'});
    } else if (!address.district) {
      setAddress({...address, dataType: 'd'});
    } else if (!address.ward) {
      setAddress({...address, dataType: 'w'});
    }
    setAddress({...address, error: 'Vui lòng chọn đúng địa chỉ!'});
  };

  const addAddress = () => {
    if (address.province && address.district && address.ward) {
      navigation.navigate('AddAddress', {
        address: dataAddress,
      });
    } else {
      handleError();
    }
  };

  const changeDataType = dataType => {
    setAddress({...address, dataType: dataType});
    if (dataType === 'p') {
      setAddress({...address, divisionCode: '0'});
    }
    if (dataType === 'd' && address.province) {
      setAddress({...address, divisionCode: address.provinceId});
    }
    if (dataType === 'w' && address.district) {
      setAddress({...address, divisionCode: address.districtId});
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 20,
        paddingTop: 35,
        alignItems: 'center',
      }}>
      <View style={{width: '100%'}}>
        <Pressable onPress={() => changeDataType('p')}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <View
              style={{
                width: 13,
                height: 13,
                backgroundColor: 'green',
                borderRadius: 13,
                marginRight: 15,
              }}></View>
            <Text style={{color: 'black', fontSize: 20}}>
              {address.province ? (
                <Text>{address.province}</Text>
              ) : (
                <Text>Tỉnh/Thành phố</Text>
              )}
            </Text>
          </View>
        </Pressable>

        {address.province ? (
          <Pressable onPress={() => changeDataType('d')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: 'green',
                  borderRadius: 13,
                  marginRight: 15,
                }}></View>
              <Text style={{color: 'black', fontSize: 20}}>
                {address.district ? (
                  <Text>{address.district}</Text>
                ) : (
                  <Text>Quận/Huyện</Text>
                )}
              </Text>
            </View>
          </Pressable>
        ) : (
          <View></View>
        )}

        {address.district ? (
          <Pressable onPress={() => changeDataType('w')}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: 'green',
                  borderRadius: 13,
                  marginRight: 15,
                }}></View>
              <Text style={{color: 'black', fontSize: 20}}>
                {address.ward ? (
                  <Text>{address.ward}</Text>
                ) : (
                  <Text>Xã/Phường/Thị trấn</Text>
                )}
              </Text>
            </View>
          </Pressable>
        ) : (
          <View></View>
        )}

        <View
          style={{
            marginVertical: 10,
            height: '75%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <FlatList
            data={address.data}
            ListEmptyComponent={<ActivityIndicator />}
            keyExtractor={item => item.id}
            renderItem={item => (
              <TouchableOpacity onPress={() => itemClick(item)}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    borderBottomWidth: 1,
                  }}>
                  <Text style={{fontSize: 17, marginVertical: 5}}>
                    {item.item.division_name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 10,
        }}>
        {address.error ? (
          <Text
            style={{
              color: 'red',
              fontSize: 17,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {address.error}
          </Text>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          style={{
            width: '100%',
            backgroundColor: 'black',
            marginBottom: 10,
            borderRadius: 20,
            paddingVertical: 4,
            borderWidth: 2,
          }}
          onPress={() => {
            // Check account
            addAddress();
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 25,
              color: 'white',
            }}>
            Thêm địa chỉ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressList;
