import React,{Fragment}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import { Document, Page, Text, View, PDFViewer, StyleSheet} from '@react-pdf/renderer'
import Spinner from '../layouts/Spinner'

const PrintPDF = ({eligible}) => {

    const {loading, students} = eligible;
    const company = students.shift()

    if(students.length<=0){
        return <Redirect to="/po_form"/>
    }

    const styles = StyleSheet.create({
        heading:{
            textAlign: 'center',
            padding:'10px'
        },
        text:{
            padding:'5px',
            paddingLeft:'10px',
            marginTop:'5px',
            marginBottom:'5px'
        },
        cgpa:{
            paddingLeft:'13px',
            width:'100%'
        },
        img:{
            width:'381px',
            height:'120px'
        }
    })

    const MyPDF = (<Document>
            <Page size="A4">
                <View>
                    <Text style={styles.heading}>
                        Fr. Conceicao Rodrigues College Of Engineering
                    </Text>
                    <Text style={styles.heading}>
                        Name Of Recruiter: {company.company}
                    </Text> 
                    {students.map((student) => {
                        return(
                        <View>
                            <Text style={styles.text}>
                                *{student.user.name} | {student.user.year} | {student.user.branch} | Contact: {student.contact[0]}
                            </Text>
                            <Text style={styles.cgpa}>
                                CGPA: {student.status[0].cgpa}     Backlogs: {student.status[0].backlogs}
                            </Text>
                        </View>
                        )
                    })}
                </View>         
            </Page>
        </Document>)


    return (
        <Fragment>
            <div className="pdf">
                {loading ? (<Fragment>
                    <Spinner/>    
                </Fragment>):
                (<PDFViewer style={{height:'1500px', width:'1240px'}}>{MyPDF}</PDFViewer>)}
            </div>
        </Fragment>
    )
}

PrintPDF.propTypes = {
    eligible: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    eligible: state.eligible
})

export default connect(mapStateToProps,{})(PrintPDF)
