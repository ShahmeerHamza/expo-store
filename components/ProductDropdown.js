import { StyleSheet } from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import { FontAwesome, } from "@expo/vector-icons";
const ProductDropdown = ({ handleIdSelection, data, handleProductSelection }) => {

    // const products = [
    //     {
    //         key: '1',
    //         value: 'product1'
    //     },
    //     {
    //         key: '2',
    //         value: 'product2'
    //     },
    //     {
    //         key: '3',
    //         value: 'product3'
    //     },
    //     {
    //         key: '4',
    //         value: 'product4'
    //     },
    //     {
    //         key: '5',
    //         value: 'product5'
    //     },
    //     {
    //         key: '6',
    //         value: 'product6'
    //     },
    //     {
    //         key: '7',
    //         value: 'product7'
    //     },
    //     {
    //         key: '8',
    //         value: 'product8'
    //     },
    //     {
    //         key: '9',
    //         value: 'product9'
    //     },
    //     {
    //         key: '10',
    //         value: 'product10'
    //     },
    //     {
    //         key: '11',
    //         value: 'product11'
    //     },
    //     {
    //         key: '12',
    //         value: 'product12'
    //     },
    //     {
    //         key: '13',
    //         value: 'product13'
    //     },
    //     {
    //         key: '14',
    //         value: 'product14'
    //     },
    //     {
    //         key: '15',
    //         value: 'product15'
    //     },
    //     {
    //         key: '16',
    //         value: 'product16'
    //     },
    //     {
    //         key: '17',
    //         value: 'product17'
    //     },
    //     {
    //         key: '18',
    //         value: 'product18'
    //     },
    //     {
    //         key: '19',
    //         value: 'product19'
    //     },
    //     {
    //         key: '20',
    //         value: 'product20'
    //     },
    //     {
    //         key: '21',
    //         value: 'product21'
    //     },
    //     {
    //         key: '22',
    //         value: 'product22'
    //     },
    //     {
    //         key: '23',
    //         value: 'product23'
    //     },
    //     {
    //         key: '24',
    //         value: 'product24'
    //     },
    //     {
    //         key: '25',
    //         value: 'product25'
    //     },
    //     {
    //         key: '26',
    //         value: 'product26'
    //     },
    //     {
    //         key: '27',
    //         value: 'product27'
    //     },
    //     {
    //         key: '28',
    //         value: 'product28'
    //     },
    //     {
    //         key: '29',
    //         value: 'product29'
    //     },
    //     {
    //         key: '30',
    //         value: 'product30'
    //     },
    // ];

    return (
        <>
            {
                data?.length ?
                    <SelectList
                        setSelected={(v) => handleIdSelection(v)}
                        setSelectedProduct={(item => handleProductSelection(item))}
                        data={data}
                        arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                        searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                        search={true}
                        boxStyles={{ borderRadius: 10, width: '100%', backgroundColor: '#fff' }} //override default styles

                    // defaultOption={{ id: 2 }}   //default selected option
                    /> : null
            }
        </>
    )
}

export default ProductDropdown

const styles = StyleSheet.create({});